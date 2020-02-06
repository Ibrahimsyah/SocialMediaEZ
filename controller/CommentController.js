const db = require('../database');

module.exports = {
  postComment: async (req, res, next) => {
    const { id_user, id_post } = req.query;
    const { content } = req.body;
    const errors = [];
    try {
      const [postResult,] = await db.query('SELECT * FROM post WHERE id=?', [id_post]);
      const [userResult,] = await db.query('SELECT * FROM user WHERE id=?', [id_user]);
      if (!postResult.length) errors.push({ post: 'post not found' });
      if (!userResult.length) errors.push({ user: 'user not found' });
      if (errors.length > 0) {
        return res.status(404).json({
          success: false,
          message: 'Not Found',
          errors
        });
      }
      await db.query('INSERT INTO comment(id_user, id_post, content) VALUES(?, ?, ?)', [id_user, id_post, content]);
      res.status(201).json({
        success: true,
        message: "Comment submitted"
      });
    } catch (error) {
      console.log(error);
      error.message = 'Internal Server Error';
      next(error);
    }
  },
  getAllCommentByPost: async (req, res, next) => {
    const { id } = req.params;
    const data = [];
    try {
      const [commentResult,] = await db.query('SELECT * FROM comment WHERE id_post=?', [id]);
      commentResult.forEach(comment => data.push(comment));
      res.status(200).json({
        success: true,
        data
      });
    } catch (error) {
      console.log(error);
      error.message = 'Internal Server Error';
      next(error);
    }
  },
  deleteComment: async (req, res, next) => {
    const { id_comment, id_user, id_post } = req.query;
    try {
      const [commentResult,] = await db.query('SELECT * FROM comment WHERE id=? AND id_user=? AND id_post=?', [id_comment, id_user, id_post]);
      if (!commentResult.length) {
        const error = new Error('Comment not found');
        error.statusCode = 404;
        return next(error);
      }
      await db.query('DELETE FROM comment WHERE id=? AND id_user=? AND id_post=?', [id_comment, id_user, id_post]);
      res.status(204).end();
    } catch (error) {
      console.log(error);
      error.message = 'Internal Server Error';
      next(error);
    }
  },
  updateComment: async (req, res, next) => {
    const { id_comment, id_user, id_post } = req.query;
    const { content } = req.body;
    try {
      const [commentResult,] = await db.query('SELECT * FROM comment WHERE id=? AND id_user=? AND id_post=?', [id_comment, id_user, id_post]);
      if (!commentResult.length) {
        const error = new Error('Comment not found');
        error.statusCode = 404;
        return next(error);
      }
      await db.query('UPDATE comment SET content=? WHERE id=? AND id_user=? AND id_post=?', [content, id_comment, id_user, id_post]);
      res.status(200).json({
        success: true,
        message: 'Comment updated'
      });
    } catch (error) {
      console.log(error);
      error.message = 'Internal Server Error';
      next(error);
    }
  }
}

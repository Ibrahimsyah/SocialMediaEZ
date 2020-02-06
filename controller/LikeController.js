const db = require('../database');

module.exports = {
  postLike: async (req, res, next) => {
    const { id, id_user } = req.query;
    try {
      const [postResult,] = await db.query('SELECT * FROM post WHERE id=? LIMIT 1', [id]);
      if (!postResult.length) {
        const error = new Error('Post not found');
        error.statusCode = 404;
        return next(error);
      }
      const [likesResult,] = await db.query('SELECT * FROM likes WHERE id_post=? AND id_user=? LIMIT 1', [id, id_user]);
      if (likesResult.length) {
        const error = new Error('Post already liked');
        error.statusCode = 409;
        return next(error);
      }
      await db.query('INSERT INTO likes(id_post, id_user) VALUES(?, ?)', [id, id_user]);
      res.status(200).json({
        success: true,
        message: "liked"
      });
    } catch (error) {
      console.log(error);
      error.message = 'Internal Server Error';
      next(err);
    }
  },
  deleteLike: async (req, res, next) => {
    const { id, id_user } = req.query;
    try {
      const [postResult,] = await db.query('SELECT * FROM post WHERE id=? LIMIT 1', [id]);
      if (!postResult.length) {
        const error = new Error('Post not found');
        error.statusCode = 404;
        return next(error);
      }
      const [likesResult,] = await db.query('SELECT * FROM likes WHERE id_post=? AND id_user=? LIMIT 1', [id, id_user]);
      if (!likesResult.length) {
        const error = new Error('Post has not liked');
        error.statusCode = 409;
        return next(error);
      }
      await db.query('DELETE FROM likes WHERE id_post=? AND id_user=?', [id, id_user]);
      res.status(204).end();
    } catch (error) {
      console.log(error);
      error.message = 'Internal Server Error';
      next(err);
    }
  }
}

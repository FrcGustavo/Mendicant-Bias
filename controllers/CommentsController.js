const Comments = {};

class CommentsControllers {
  constructor() {
    this.comments = Comments;
  }

  async index(req, res, next) {
    const postUid = req.params.id;
    try {
      const comments = await this.comments.findByPost(postUid);
      if (comments != null) {
        this.success(res, 'comments listed', comments, 200);
      } else {
        this.success(res, 'comments not found', comments, 404);
      }
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    const comment = req.body;
    try {
      const createdComment = await this.comments.create(comment);
      this.success(res, 'comment created', createdComment, 200);
    } catch (error) {
      next(error);
    }
  }

  async destroy(req, res, next) {
    const postUid = req.params.id;
    try {
      const deletedComment = await this.comments.destroy(postUid);
      this.success(res, 'comment deleted', deletedComment, 200);
    } catch (error) {
      next(error);
    }
  }

  static success(res, message, data, status) {
    res.status(status).json({ message, data });
  }
}

module.exports = CommentsControllers;

import PostModel from '../models/Post.js'


export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec()

        const tags = posts.map(post => post.tags).flat().slice(0,5)

        res.json(tags)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}

export const getLastComments = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec()

        const comments = posts.map(post => post.comments).flat().slice(0,5)

        res.json(comments)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()
        const tags = posts.map(post => post.tags).flat().slice(0, 5);
        res.json({posts, tags})
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}

export const getNew = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    const tags = sortedPosts.map(post => post.tags).flat().slice(0, 5);
    res.json({ posts: sortedPosts, tags });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

export const getPopular = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()
        const sortedPostsByViewsCount = [...posts].sort((a, b) => b.viewsCount - a.viewsCount);
        const tags = sortedPostsByViewsCount.map(post => post.tags).flat().slice(0, 5);
        res.json({posts: sortedPostsByViewsCount, tags})
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}

export const getByTag = async (req, res) => {
  try {
    const postss = await PostModel.find().populate('user').exec()
    const posts = [...postss].filter(post => post.tags.some(tag => tag === req.params.tag))
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        
        const removeDoc = await PostModel.findByIdAndDelete({
            _id: postId,
        })

        if (!removeDoc) {
            return res.status(404).json({
                message: 'Статья не найдена'
            });
        }

        res.json({
            success: true
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Не удалось получить статью'
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedDoc = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { new: true }
        ).populate('user');

        if (!updatedDoc) {
            return res.status(404).json({
                message: 'Статья не найдена'
            });
        }

        res.json(updatedDoc);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Не удалось получить статью'
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        const post = await doc.save()
        res.status(201).json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать пост'
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await PostModel.findById(postId);
        
        if (post.user.toString() !== req.userId) {
            post.comments = req.body.comments;
            await post.save()
        }else { await PostModel.updateOne({
            _id: postId
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
            comments: req.body.comments
        })}
        
        res.json({
            succes: true
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить пост'
        })
    }
}

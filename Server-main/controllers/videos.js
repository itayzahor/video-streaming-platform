// Import the video service module
const videoService = require('../services/videos');


// Get all videos
const getTopVideos = async (req, res) => {
    try {
        res.status(200).json(await videoService.getTopVideos());

    } catch (err) {
        res.status(500).json({ errors: ['Videos not found'] });
    }
};
const getTcpVideos = async (req, res) => {
    try {
        res.status(200).json(await videoService.getTcpVideos());

    } catch (err) {
        res.status(500).json({ errors: ['Videos not found'] });
    }
};

const userWatchVideo = async (req, res) => {
    const video = await videoService.getVideoById(req.params.id);

    if (!video) {
        return res.status(404).json({ errors: ['Video not found'] });
    }

    video.views += 1; // Increment views count for authenticated user
    await video.save(); // Save video after incrementing views

    if (req.user) { // Check if user is authenticated
        try {
            await videoService.notifyTcpServer(req.user.id, video.id); // Notify TCP server
        } catch (error) {
            console.error('Error notifying TCP server:', error);
        }
    }

    res.status(200).json(video);
};


const guestWatchVideo = async (req, res) => {
    const video = await videoService.getVideoById(req.params.id);

    if (!video) {
        return res.status(404).json({ errors: ['Video not found'] });
    }
    await video.save(); // Save video after incrementing views

    res.status(200).json(video);
};


// Update a video by ID
const updateVideo = async (req, res) => {
    const video = await videoService.updateVideo(req.params.id,  req.body.views, req.body.likedBy,  req.body.dislikedBy);
    if (!video) {
        return res.status(404).json({ errors: ['Video not found'] });
    }
    res.json(video); //not sure if this is correct
};

// Get all videos that start with a specific prefix
const getVideosByPrefix = async (req, res) => {
    res.status(200).json(await videoService.getVideosByPrefix(req.params.prefix));
}

module.exports = {updateVideo, getTopVideos, getTcpVideos, userWatchVideo, guestWatchVideo, getVideosByPrefix };
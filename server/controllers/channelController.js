import Channel from "../model/Channel.js";
import User from "../model/User.js";
import { formatCount } from "../utilities/formatCount.js";

export const createChannel = async (req, res) => {
  try {
    const { channelName, description } = req.body;

    const randomSubscribers = Math.floor(Math.random() * 10000 + 800);

    const channel = new Channel({
      channelName,
      description,
      owner: req.user.id,
      subscribers: randomSubscribers,
    });

    const savedChannel = await channel.save();
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { channels: savedChannel._id },
      });
    } catch (updateError) {
      console.error("Error updating user channels:", updateError);
      return res.status(500).json({
        message: "Channel created, but failed to update user's channels array",
        error: updateError,
      });
    }

    res.status(201).json({
      id: savedChannel._id,
      channelName: savedChannel.channelName,
      description: savedChannel.description,
      subscribers: savedChannel.subscribers,
      owner: savedChannel.owner,
    });
  } catch (error) {
    console.error("Error creating channel:", error);
    return res.status(500).json({
      message: "Error creating channel",
      error,
    });
  }
};

export const getChannel = async (req, res) => {
  const { channelId } = req.params;
  try {
    const channel = await Channel.findById(channelId)
      .populate({
        path: "videos",
        select: "title thumbnailUrl views category",
      })
      .populate("owner", "username avatar");

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    const formattedChannel = {
      ...channel.toObject(),
      subscribers: formatCount(channel.subscribers),
      avatar: channel.owner.avatar,
    };
    res.json(formattedChannel);
  } catch (error) {
    console.error("Error fetching channel:", error);
    res.status(500).json({ message: "Error fetching channel", error });
  }
};

export const getUserChannel = async (req, res) => {
  try {
    const userChannel = await Channel.findOne({ owner: req.user.id });
    if (!userChannel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    res.json(userChannel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user channel", error });
  }
};

export const updateChannel = async (req, res) => {
  const { channelId } = req.params;
  const { channelName, description } = req.body;

  try {
    const channel = await Channel.findById(channelId);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    if (channel.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this channel" });
    }
    channel.channelName = channelName;
    channel.description = description;
    const updatedChannel = await channel.save();

    res.json(updatedChannel);
  } catch (error) {
    res.status(500).json({ message: "Error updating channel", error });
  }
};

export const deleteChannel = async (req, res) => {
  try {
    const { channelId } = req.params;
    const channel = await Channel.findById(channelId);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    if (channel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Channel.findByIdAndDelete(channelId);
    return res.status(200).json({ message: "Channel deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete channel" });
  }
};
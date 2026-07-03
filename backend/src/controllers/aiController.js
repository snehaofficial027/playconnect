const axios = require("axios");
const User = require("../models/User");

const getAISuggestion = async (req, res) => {
  try {

    const { sport, city, skillLevel } = req.body;

    // Get all players except current user
    const players = await User.find({
      _id: { $ne: req.user.id },
    });

    // Calculate compatibility score
    const recommendations = players.map((player) => {

      let score = 0;

      if (
        player.sport &&
        player.sport === sport
      ) {
        score += 40;
      }

      if (
        player.city &&
        player.city === city
      ) {
        score += 25;
      }

      if (
        player.skillLevel &&
        player.skillLevel === skillLevel
      ) {
        score += 20;
      }

      if (player.bio) {
        score += 5;
      }

      if (player.profileImage) {
        score += 10;
      }

      return {
        name: player.name,
        city: player.city,
        sport: player.sport,
        skillLevel: player.skillLevel,
        score,
      };

    });

    recommendations.sort(
      (a, b) => b.score - a.score
    );

    const topPlayers =
      recommendations.slice(0, 5);

    const prompt = `
You are an AI Sports Coach.

Current User

Sport: ${sport}

City: ${city}

Skill Level: ${skillLevel}

Top Matching Players

${JSON.stringify(topPlayers)}

Give response in this format.

🏆 Best Player

Name

Compatibility %

Reason

🥈 Other Good Players

🏃 Practice Plan

🏅 Best Tournament

📈 Improvement Tips

Keep response short and professional.
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      success: true,
      players: topPlayers,
      suggestion:
        response.data.choices[0].message.content,
    });

  } catch (error) {

    console.log(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "AI Error",
    });

  }
};

module.exports = {
  getAISuggestion,
};
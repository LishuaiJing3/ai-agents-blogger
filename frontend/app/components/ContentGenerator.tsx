// app/components/ContentGenerator.tsx
"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  ContentCopy as ContentCopyIcon,
  Download as DownloadIcon,
  Create as CreateIcon,
  People as PeopleIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";

export default function ContentGenerator() {
  const [llm, setLlm] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [blogIdeas, setBlogIdeas] = useState("");
  const [audience, setAudience] = useState("");
  const [output, setOutput] = useState<{ blog: string; linkedin: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disclaimer, setDisclaimer] = useState("This content is AI-generated. Please review and edit as necessary.");
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulating API call (you can replace with your API integration later)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setOutput({
        blog: JSON.stringify(
          {
            title: "10 Innovative Strategies to Boost Your Social Media Presence 🚀",
            sections: [
              {
                heading: "1. Leverage User-Generated Content 📸",
                content:
                  "Encourage your followers to create and share content related to your brand. This not only increases engagement but also provides you with a wealth of authentic material to reshare.",
              },
              {
                heading: "2. Implement a Consistent Posting Schedule ⏰",
                content:
                  "Maintain a regular posting schedule to keep your audience engaged and increase your visibility on social media platforms. Use scheduling tools to plan your content in advance.",
              },
              {
                heading: "3. Utilize Interactive Features 🎭",
                content:
                  "Make use of platform-specific features like Instagram Stories, Twitter Polls, or Facebook Live to create interactive experiences for your audience.",
              },
            ],
            conclusion:
              "By implementing these strategies, you can significantly enhance your social media presence and connect with your audience on a deeper level. Remember, consistency and authenticity are key to long-term success on social media platforms.",
          },
          null,
          2
        ),
        linkedin: `🔥 Hot Take: Social Media Success Isn't About Luck, It's About Strategy! 🎯

Are you struggling to make an impact on social media? It's time to level up your game! 💪

Here are 3 game-changing strategies that successful brands are using right now:

1️⃣ User-Generated Content: Turn your followers into your best marketers!
2️⃣ Consistent Posting: Keep your audience engaged with a rock-solid schedule.
3️⃣ Interactive Features: Stories, polls, live videos - get your audience involved!

Want to learn more? Check out my latest blog post for a deep dive into these strategies and more!

#SocialMediaStrategy #DigitalMarketing #BrandGrowth

What's your biggest social media challenge? Drop a comment below! 👇`,
      });
    } catch (err) {
      setError("An error occurred while generating content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSnackbar({ open: true, message: "Copied to clipboard!" });
  };

  const downloadJSON = (data: object, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    setSnackbar({ open: true, message: "JSON file downloaded!" });
  };

  const springProps = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 300, friction: 10 },
  });

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card elevation={3} sx={{ mb: 4, p: 2, background: "rgba(225, 225, 225, 0.05)", backdropFilter: "blur(10px)" }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom sx={{ color: "#3dc9b3" }}>
              Input Section
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="llm-select-label" sx={{ color: "#a1a0a0" }}>
                    Select LLM 🤖
                  </InputLabel>
                  <Select
                    labelId="llm-select-label"
                    value={llm}
                    label="Select LLM 🤖"
                    onChange={(e) => setLlm(e.target.value)}
                    sx={{
                      color: "#e1e1e1",
                      "& .MuiOutlinedInput-notchedOutline": { borderColor: "#309383" },
                      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#3dc9b3" },
                    }}
                  >
                    <MenuItem value="gemini">Gemini</MenuItem>
                    <MenuItem value="gpt4">GPT-4</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="password"
                  label="API Key 🔑"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  sx={{
                    "& .MuiInputLabel-root": { color: "#a1a0a0" },
                    "& .MuiOutlinedInput-root": {
                      color: "#e1e1e1",
                      "& fieldset": { borderColor: "#309383" },
                      "&:hover fieldset": { borderColor: "#3dc9b3" },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Blog Content Ideas 💡"
                  value={blogIdeas}
                  onChange={(e) => setBlogIdeas(e.target.value)}
                  sx={{
                    "& .MuiInputLabel-root": { color: "#a1a0a0" },
                    "& .MuiOutlinedInput-root": {
                      color: "#e1e1e1",
                      "& fieldset": { borderColor: "#309383" },
                      "&:hover fieldset": { borderColor: "#3dc9b3" },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Targeted Audience 🎯"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  sx={{
                    "& .MuiInputLabel-root": { color: "#a1a0a0" },
                    "& .MuiOutlinedInput-root": {
                      color: "#e1e1e1",
                      "& fieldset": { borderColor: "#309383" },
                      "&:hover fieldset": { borderColor: "#3dc9b3" },
                    },
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
              sx={{
                background: "linear-gradient(45deg, #309383 30%, #3dc9b3 90%)",
                color: "#101010",
                "&:hover": {
                  background: "linear-gradient(45deg, #3dc9b3 30%, #309383 90%)",
                },
              }}
            >
              {loading ? "Generating..." : "Generate Content ✨"}
            </Button>
          </CardActions>
        </Card>
      </motion.div>

      {output && (
        <>
          <animated.div style={springProps}>
            <Card
              elevation={3}
              sx={{ mb: 4, p: 2, background: "rgba(225, 225, 225, 0.05)", backdropFilter: "blur(10px)" }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", color: "#3dc9b3" }}
                >
                  <CreateIcon sx={{ mr: 1 }} /> Blog Content
                </Typography>
                <Box sx={{ mt: 2, color: "#e1e1e1" }}>
                  <Typography variant="h4" gutterBottom>
                    {JSON.parse(output.blog).title}
                  </Typography>
                  {JSON.parse(output.blog).sections.map(
                    (section: { heading: string; content: string }, index: number) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          {section.heading}
                        </Typography>
                        <Typography variant="body1" paragraph>
                          {section.content}
                        </Typography>
                      </Box>
                    ),
                  )}
                  <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                    {JSON.parse(output.blog).conclusion}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  startIcon={<ContentCopyIcon />}
                  onClick={() =>
                    copyToClipboard(
                      JSON.parse(output.blog).title +
                        "\n\n" +
                        JSON.parse(output.blog)
                          .sections.map((s: { heading: string; content: string }) => s.heading + "\n" + s.content)
                          .join("\n\n") +
                        "\n\n" +
                        JSON.parse(output.blog).conclusion,
                    )
                  }
                  sx={{ color: "#3dc9b3" }}
                >
                  Copy
                </Button>
                <Button
                  startIcon={<DownloadIcon />}
                  onClick={() => downloadJSON(JSON.parse(output.blog), "blog-content.json")}
                  sx={{ color: "#3dc9b3" }}
                >
                  Download JSON
                </Button>
              </CardActions>
            </Card>
          </animated.div>

          <animated.div style={springProps}>
            <Card
              elevation={3}
              sx={{ mb: 4, p: 2, background: "rgba(225, 225, 225, 0.05)", backdropFilter: "blur(10px)" }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", color: "#3dc9b3" }}
                >
                  <PeopleIcon sx={{ mr: 1 }} /> LinkedIn Engaging Content
                </Typography>
                <Box sx={{ mt: 2, color: "#e1e1e1", whiteSpace: "pre-wrap" }}>{output.linkedin}</Box>
              </CardContent>
              <CardActions>
                <Button
                  startIcon={<ContentCopyIcon />}
                  onClick={() => copyToClipboard(output.linkedin)}
                  sx={{ color: "#3dc9b3" }}
                >
                  Copy
                </Button>
              </CardActions>
            </Card>
          </animated.div>
        </>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card elevation={3} sx={{ mb: 4, p: 2, background: "rgba(225, 225, 225, 0.05)", backdropFilter: "blur(10px)" }}>
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", color: "#3dc9b3" }}
            >
              <WarningIcon sx={{ mr: 1 }} /> Disclaimer
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={2}
              value={disclaimer}
              onChange={(e) => setDisclaimer(e.target.value)}
              sx={{
                "& .MuiInputBase-input": { color: "#e1e1e1" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#309383" },
                  "&:hover fieldset": { borderColor: "#3dc9b3" },
                },
              }}
            />
          </CardContent>
        </Card>
      </motion.div>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity="success" sx={{ width: "100%", backgroundColor: "#3dc9b3", color: "#101010" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

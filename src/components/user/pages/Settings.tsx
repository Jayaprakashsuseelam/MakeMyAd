import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Box,
  Divider,
  Alert
} from '@mui/material';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    messageNotifications: true,
    newsletter: false,
    phone: '',
    alternativeEmail: '',
    language: 'English',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setSettings(prev => ({
      ...prev,
      [name]: event.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement settings update logic
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Account Settings
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {saved && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Settings saved successfully!
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={settings.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Alternative Email"
                    name="alternativeEmail"
                    value={settings.alternativeEmail}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Notifications
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.emailNotifications}
                        onChange={handleChange}
                        name="emailNotifications"
                      />
                    }
                    label="Email Notifications"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.messageNotifications}
                        onChange={handleChange}
                        name="messageNotifications"
                      />
                    }
                    label="Message Notifications"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.newsletter}
                        onChange={handleChange}
                        name="newsletter"
                      />
                    }
                    label="Subscribe to Newsletter"
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Preferences
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Language"
                    name="language"
                    value={settings.language}
                    onChange={handleChange}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="English">English</option>
                    <option value="French">French</option>
                  </TextField>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ ml: 1 }}
                >
                  Save Changes
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Settings;

# Profile Data Configuration

This folder contains the centralized profile data file that manages **ALL** your profile information including social media URLs, personal details, education, work experience, certifications, and achievements.

## 📄 profile-data.json

This JSON file contains **everything** that can change on your portfolio website. Update this single file to change any information across your entire website.

### How to Update Your Information

1. Open `profile-data.json` in any text editor
2. Update the values you want to change
3. Save the file
4. The changes will automatically be applied across your website

### Complete File Structure

```json
{
  "personal": {
    "name": "Your Name",
    "email": "your.email@example.com",
    "location": "City, Country",
    "aboutMe": {
      "paragraph1": "First paragraph of your about me section...",
      "paragraph2": "Second paragraph...",
      "paragraph3": "Third paragraph..."
    },
    "age": {
      "birthYear": 2004,
      "birthMonth": 0,    // 0 = January, 11 = December
      "birthDay": 1
    }
  },
  "social": {
    "facebook": "https://facebook.com/yourusername",
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername"
  },
  "education": [
    {
      "degree": "Bachelor's Degree in Information Technology",
      "institution": "Your University Name",
      "location": "City, Country",
      "startYear": "2020",
      "endYear": "2024",
      "isOngoing": false,
      "description": "Relevant coursework or additional info"
    }
  ],
  "experience": [
    {
      "title": "Web Developer",
      "company": "Company Name",
      "location": "City, Country",
      "startDate": "2023-01",
      "endDate": "Present",
      "isCurrent": true,
      "description": "Brief description of role",
      "responsibilities": [
        "Responsibility 1",
        "Responsibility 2",
        "Responsibility 3"
      ]
    }
  ],
  "certifications": [
    {
      "title": "Certification Name",
      "issuingOrganization": "Organization Name",
      "issueDate": "2023-06",
      "expiryDate": "",
      "credentialId": "ID-12345",
      "credentialUrl": "https://..."
    }
  ],
  "achievements": [
    {
      "title": "Achievement Title",
      "organization": "Organization Name",
      "date": "2023",
      "description": "Description of achievement"
    }
  ]
}
```

### What Gets Updated Automatically

When you update `profile-data.json`, the following are automatically updated:

- ✅ All social media links (Facebook, GitHub, LinkedIn, Twitter, Instagram, YouTube)
- ✅ Email addresses and mailto links
- ✅ Personal information (name, location, profession)
- ✅ About Me section (all paragraphs)
- ✅ Education section (all entries)
- ✅ Professional Experience section (all entries)
- ✅ Certifications section (all entries)
- ✅ Achievements section (all entries)
- ✅ Structured data (JSON-LD) for SEO
- ✅ Age calculation (if birth date is provided)

### Detailed Sections

#### Education
- Add multiple education entries in the `education` array
- Set `isOngoing: true` or `endYear: "Present"` for current education
- Date format: Use year as string (e.g., "2020", "2024")

#### Professional Experience
- Add multiple experience entries in the `experience` array
- Set `isCurrent: true` or `endDate: "Present"` for current positions
- Date format: "YYYY-MM" (e.g., "2023-01")
- Add responsibilities as an array of strings

#### Certifications
- Add multiple certifications in the `certifications` array
- Include `credentialUrl` to link to verification page
- Leave `expiryDate` empty if no expiration

#### Achievements
- Add multiple achievements in the `achievements` array
- Use any date format that makes sense

### Notes

- **Arrays**: All sections (education, experience, certifications, achievements) are arrays - you can add multiple entries
- **Empty fields**: Leave fields as empty string `""` if not applicable
- **Empty arrays**: Use empty array `[]` to hide a section
- **Birth month**: Use 0-11 (0 = January, 11 = December)
- **All changes**: Are applied automatically on page load
- **No code changes needed**: Just update the JSON file!
- **Order matters**: Entries are displayed in the order they appear in the JSON file


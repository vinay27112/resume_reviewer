# Test Data for Interview Report Generation

This directory contains sample data for testing the interview report generation functionality.

## Files

### 1. sample-resume.txt

Contains a realistic resume in text format for Sarah Chen, a Senior Frontend Engineer with 4 years of experience. This represents the resume content that would be extracted from a PDF file.

**Usage**: When testing the API, you can use this text content as the extracted resume text.

### 2. sample-self-description.txt

Contains a professional self-description that a candidate might provide about themselves, their skills, and their career goals.

**Usage**: Pass this content in the `selfDescription` field of the POST request body.

### 3. sample-job-description.txt

Contains a job posting for a Senior Full-Stack Engineer position at "InnovateTech Solutions". This represents the job the candidate is applying for.

**Usage**: Pass this content in the `jobDescription` field of the POST request body.

## How to Test with cURL

To test the report generation endpoint locally:

```bash
# Create a temporary PDF from the resume text
# Then use it with the API endpoint

curl -X POST http://localhost:5000/api/interview/generate-report \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@path/to/resume.pdf" \
  -F "jobDescription=<sample-job-description.txt" \
  -F "selfDescription=<sample-self-description.txt"
```

## How to Test with Postman

1. Create a POST request to `http://localhost:5000/api/interview/generate-report`
2. Add your JWT token to the Authorization header (Bearer token)
3. Go to Body > form-data
4. Add fields:
   - `file` (type: File) - Upload a PDF file created from the resume content
   - `jobDescription` (type: Text) - Copy content from sample-job-description.txt
   - `selfDescription` (type: Text) - Copy content from sample-self-description.txt
5. Send the request

## Notes

- The resume.txt file is provided as text, but the actual API expects a PDF file. You'll need to create a PDF from this content for testing.
- All sample data is realistic and suitable for testing the AI report generation functionality.
- These files represent a strong candidate applying for a role that matches their experience level.

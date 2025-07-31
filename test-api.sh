#!/bin/bash

# CV Builder API Testing Script
# Make sure to start the server first: npm run start:dev

BASE_URL="http://localhost:3000"
EMAIL="test@example.com"
PASSWORD="password123"
JWT_TOKEN=""

echo "🚀 CV Builder API Testing Script"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to make API calls with pretty output
api_call() {
    local method=$1
    local endpoint=$2
    local data=$3
    local auth_header=$4
    
    echo -e "\n${BLUE}➤ $method $endpoint${NC}"
    
    if [ "$auth_header" = "true" ]; then
        if [ -z "$JWT_TOKEN" ]; then
            echo -e "${RED}❌ No JWT token available. Please login first.${NC}"
            return
        fi
        curl -s -X $method \
             -H "Content-Type: application/json" \
             -H "Authorization: Bearer $JWT_TOKEN" \
             -d "$data" \
             "$BASE_URL$endpoint" | jq '.' 2>/dev/null || echo "Response received (not JSON)"
    else
        curl -s -X $method \
             -H "Content-Type: application/json" \
             -d "$data" \
             "$BASE_URL$endpoint" | jq '.' 2>/dev/null || echo "Response received (not JSON)"
    fi
}

# Test 1: Register User
echo -e "\n${YELLOW}1. Testing User Registration${NC}"
REGISTER_DATA="{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}"
api_call "POST" "/api/v1/auth/register" "$REGISTER_DATA" false

# Test 2: Login User
echo -e "\n${YELLOW}2. Testing User Login${NC}"
LOGIN_DATA="{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}"
LOGIN_RESPONSE=$(curl -s -X POST \
    -H "Content-Type: application/json" \
    -d "$LOGIN_DATA" \
    "$BASE_URL/api/v1/auth/login")

echo "$LOGIN_RESPONSE" | jq '.' 2>/dev/null || echo "$LOGIN_RESPONSE"

# Extract JWT token
JWT_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token' 2>/dev/null)
if [ "$JWT_TOKEN" != "null" ] && [ -n "$JWT_TOKEN" ]; then
    echo -e "${GREEN}✅ JWT Token extracted successfully${NC}"
    echo "Token: ${JWT_TOKEN:0:50}..."
else
    echo -e "${RED}❌ Failed to extract JWT token${NC}"
    exit 1
fi

# Test 3: Get User Profile
echo -e "\n${YELLOW}3. Testing Get User Profile${NC}"
api_call "GET" "/api/v1/auth/profile" "" true

# Test 4: Update User Profile
echo -e "\n${YELLOW}4. Testing Update User Profile${NC}"
UPDATE_DATA='{
    "firstname": "John",
    "lastname": "Doe",
    "phone": "+1-555-0123",
    "city": "New York",
    "country": "United States",
    "title": "Software Engineer",
    "socialMedia": [
        {
            "platform": "LinkedIn",
            "link": "https://linkedin.com/in/johndoe"
        }
    ]
}'
api_call "PATCH" "/api/v1/users/1" "$UPDATE_DATA" true

# Test 5: Add Work Experience
echo -e "\n${YELLOW}5. Testing Add Work Experience${NC}"
WORK_EXP_DATA='{
    "jobTitle": "Senior Software Engineer",
    "company": "TechCorp Inc.",
    "city": "New York",
    "country": "United States",
    "startDate": "2021-01-15",
    "currentlyWorking": true,
    "jobDescriptions": [
        "Led development of microservices architecture",
        "Mentored junior developers",
        "Improved system performance by 40%"
    ],
    "summary": "Leading backend development initiatives"
}'
api_call "POST" "/api/v1/cv/work-experience" "$WORK_EXP_DATA" true

# Test 6: Get All Work Experiences
echo -e "\n${YELLOW}6. Testing Get Work Experiences${NC}"
api_call "GET" "/api/v1/cv/work-experience" "" true

# Test 7: Generate Job Description (AI Feature)
echo -e "\n${YELLOW}7. Testing AI Job Description Generation${NC}"
AI_DATA='{"jobTitle": "Software Engineer", "company": "TechCorp"}'
api_call "POST" "/api/v1/cv/work-experience/generate-description" "$AI_DATA" true

# Test 8: Get All Users
echo -e "\n${YELLOW}8. Testing Get All Users${NC}"
api_call "GET" "/api/v1/users" "" true

# Test 9: Test File Upload (if you have a test image)
echo -e "\n${YELLOW}9. Testing File Upload (Profile Photo)${NC}"
if [ -f "test-image.jpg" ]; then
    echo -e "${BLUE}➤ POST /api/v1/upload/profile-photo${NC}"
    curl -s -X POST \
         -H "Authorization: Bearer $JWT_TOKEN" \
         -F "file=@test-image.jpg" \
         "$BASE_URL/api/v1/upload/profile-photo" | jq '.' 2>/dev/null || echo "Response received"
else
    echo -e "${YELLOW}⚠️  No test-image.jpg found. Skipping file upload test.${NC}"
    echo "To test file upload, add a JPEG image named 'test-image.jpg' in this directory."
fi

# Test 10: Logout
echo -e "\n${YELLOW}10. Testing User Logout${NC}"
api_call "POST" "/api/v1/auth/logout" "" true

echo -e "\n${GREEN}🎉 API Testing Complete!${NC}"
echo -e "\n${BLUE}💡 Tips:${NC}"
echo "- Your JWT token: $JWT_TOKEN"
echo "- Server running on: $BASE_URL"
echo "- Check API_TESTING_GUIDE.md for detailed documentation"
echo "- Use Postman collection for interactive testing"

# Save token to file for future use
echo "$JWT_TOKEN" > .jwt_token
echo -e "\n${GREEN}💾 JWT token saved to .jwt_token file${NC}"
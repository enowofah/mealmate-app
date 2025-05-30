# 🍽️ MealMate App

## 🐳 Run Locally with Docker

### ⚙️ steps

- [Docker](https://www.docker.com/products/docker-desktop) installed and running

### 🏁 Steps to Run

1. **Clone the repository**

```bash
git clone https://github.com/enowofah/mealmate-app.git
cd mealmate-app

2. **Build the Docker image**

docker build -t mealmate-app .
3. **Run the container**
docker run -p 8080:80 mealmate-app

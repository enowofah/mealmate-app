import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Search, Calendar, ShoppingCart, ChevronRight } from 'lucide-react';
import Button from '../components/common/Button';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Plan better. Eat smarter.
                </h1>
                <p className="text-xl mb-8 opacity-90">
                  Discover recipes, plan your meals, and generate shopping lists with ease. MealMate helps you take control of your nutrition.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/auth">
                    <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/recipes">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-primary-600">
                      Explore Recipes
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="hidden md:block relative">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary-500 rounded-full opacity-20"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-400 rounded-full opacity-20"></div>
                <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl animate-scale-in">
                  <img 
                    src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Delicious meal" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How MealMate Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our all-in-one platform makes meal planning simple and efficient, saving you time and reducing food waste.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Search className="text-primary-500\" size={36} />}
                title="Find Recipes"
                description="Search through our database of delicious, nutritious recipes that match your dietary preferences."
              />
              <FeatureCard 
                icon={<Calendar className="text-primary-500\" size={36} />}
                title="Plan Your Meals"
                description="Organize your weekly meals with our interactive planner. Drag and drop recipes to specific days."
              />
              <FeatureCard 
                icon={<ShoppingCart className="text-primary-500\" size={36} />}
                title="Generate Shopping Lists"
                description="Automatically create shopping lists based on your meal plan, organized by categories."
              />
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join thousands of satisfied users who have transformed their cooking and eating habits with MealMate.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TestimonialCard 
                quote="MealMate has completely changed how I approach cooking. I save time, money, and eat healthier than ever."
                author="Sarah Johnson"
                role="Busy Parent"
              />
              <TestimonialCard 
                quote="As a fitness enthusiast, I love how easy it is to plan meals that align with my nutrition goals. Game changer!"
                author="Michael Chen"
                role="Fitness Coach"
              />
              <TestimonialCard 
                quote="The shopping list feature alone has saved me countless trips to the grocery store. So convenient!"
                author="Emma Rodriguez"
                role="Working Professional"
              />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-secondary-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Meal Planning?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join MealMate today and discover a simpler, healthier way to plan and prepare your meals.
            </p>
            <Link to="/auth">
              <Button size="lg" className="bg-white text-secondary-600 hover:bg-gray-100">
                Get Started Free
                <ChevronRight size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 transition-transform duration-300 hover:transform hover:scale-105">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <div className="mb-4 text-secondary-500">
        <svg width="32\" height="32\" viewBox="0 0 24 24\" fill="none\" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 7V11H9C9 12.6569 10.3431 14 12 14C13.6569 14 15 12.6569 15 11V7H11Z\" fill="currentColor" />
          <path d="M5 7V11H3C3 12.6569 4.34315 14 6 14C7.65685 14 9 12.6569 9 11V7H5Z\" fill="currentColor" />
        </svg>
      </div>
      <p className="text-gray-700 mb-6 italic">{quote}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  );
};

export default LandingPage;
import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Home } from 'lucide-react';
import Button from '../components/common/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <UtensilsCrossed size={64} className="text-primary-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 text-lg mb-8 text-center max-w-md">
        Oops! The page you're looking for has gone missing. Perhaps it's out grocery shopping?
      </p>
      <Link to="/">
        <Button size="lg" leftIcon={<Home size={20} />}>
          Return to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
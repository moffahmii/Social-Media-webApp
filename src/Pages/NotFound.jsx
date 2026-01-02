import { Button, Card, CardBody } from "@heroui/react";
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-none bg-transparent border-none">
        <CardBody className="flex flex-col items-center text-center space-y-6">

          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
            <div className="bg-white p-6 rounded-full shadow-xl relative">
              <AlertCircle size={80} className="text-primary animate-pulse" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-7xl font-black text-primary/20 select-none">404</h1>
            <h2 className="text-2xl font-bold text-slate-800">Oops! Page not found</h2>
            <p className="text-slate-500 font-medium max-w-70 mx-auto">
              The page you are looking for might have been removed or is temporarily unavailable.
            </p>
          </div>

          <Button
            as={Link}
            to="/"
            color="primary"
            variant="shadow"
            size="lg"
            radius="full"
            startContent={<Home size={20} />}
            className="font-bold px-8"
          >
            Back to Home
          </Button>

          <div className="flex gap-4 pt-4">
            <Link to="/profile" className="text-sm text-slate-400 hover:text-primary transition-colors font-semibold">
              Profile
            </Link>
            <span className="text-slate-200">|</span>
            <Link to="/login" className="text-sm text-slate-400 hover:text-primary transition-colors font-semibold">
              Login
            </Link>
          </div>

        </CardBody>
      </Card>
    </div>
  );
}
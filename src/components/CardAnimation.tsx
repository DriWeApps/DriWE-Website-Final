import Image from "next/image";
import CardSwap, { Card } from "./CardSwap";
import { Star } from 'lucide-react';

const TestimonialSection = () => {
  // Your data needs to be defined here
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Daily Commuter",
      content: "I use DriWe for my daily office commute. The drivers are punctual, and I can book my return trip while going to work. It's so convenient!",
      rating: 5,
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    },
    {
      name: "Rajesh Kumar",
      role: "Business Traveler",
      content: "Airport transfer is hassle-free using DriWe. They track my flights and adjust pickup times automatically. Professional service every time.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    },
    {
      name: "Sarah Shaikh",
      role: "Event Manager",
      content: "For client meetings and events, DriWe's hourly rental is perfect. Clean cars, professional drivers, and transparent billing.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    }
  ];

  return (
    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
      <CardSwap
        width="min(340px, 90vw)"
        height="min(400px, 80vh)"
        cardDistance={80}
        verticalDistance={10}
        delay={3000}
        pauseOnHover={true}
        skewAmount={6}
        easing="elastic"
      >
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="bg-gray-800 rounded-[16px] shadow-md p-6 flex flex-col transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
            customClass="testimonial-card"
          >
            <div className="flex items-center mb-4">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover mr-4"
                onError={(e) =>
                  (e.currentTarget.src = "/images/fallback-avatar.jpg")
                }
              />
              <div>
                <h4 className="font-semibold text-white">{testimonial.name}</h4>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </div>
            <h3 className="font-bold text-white mb-3">
              {testimonial.name.includes("Priya")
                ? "Daily Commuter"
                : testimonial.name.includes("Rajesh")
                ? "Airport Transfer"
                : "Business Events"}
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed flex-grow">
              {testimonial.content}
            </p>
            <div className="flex items-center">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-sm font-medium text-gray-400">5.0</span>
            </div>
          </Card>
        ))}
      </CardSwap>
    </div>
  );
};

export default TestimonialSection;
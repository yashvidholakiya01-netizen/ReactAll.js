import React from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  ArrowUpRight,
  Truck,
  CreditCard,
  Headphones,
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Top Bar */}
      <div className="bg-[#5a1f0f] text-white text-[11px] py-2 text-center tracking-tight">
        Support: (406) 555-0120 <span className="mx-4 opacity-40">|</span> Sign
        up and <span className="font-bold text-orange-400">GET 25% OFF</span>{" "}
        for your first order.{" "}
        <span className="underline cursor-pointer">Sign up now</span>
      </div>

      {/* Hero Header */}
      <div className="py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">About Us</h1>
        <p className="text-sm text-gray-400">Home / About Us</p>
      </div>

      {/* Our Story Section */}
      <section className="max-w-5xl mx-auto px-6 text-center mb-20">
        <span className="text-[12px] font-bold uppercase tracking-widest text-slate-400">
          Our Story
        </span>
        <h2 className="text-4xl font-bold mt-4 mb-6 leading-tight">
          Crafted with Care: Fine <br /> Materials, Thoughtful Design
        </h2>
        <p className="text-slate-500 text-sm max-w-3xl mx-auto leading-relaxed mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <div className="mb-2">
          <span className="text-3xl italic font-serif text-[#5a1f0f]">
            Jenny Alexander
          </span>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">
          Jenny Alexander • CEO
        </p>

        {/* Story Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
          <img
            src="https://talentproindia.com/wp-content/uploads/2020/03/workplace-1.jpg"
            alt="Workplace"
            className="rounded-sm w-full h-[400px] object-cover"
          />
          <div className="grid grid-rows-2 gap-4">
            <img
              src="https://havemony.com/blogs/wp-content/uploads/2024/09/Why-is-Mony-UPI-a-top-choice2.webp"
              alt="Sewing"
              className="rounded-sm w-full h-[192px] object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=800"
              alt="Fabrics"
              className="rounded-sm w-full h-[192px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#f3bc65] py-12 mb-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 text-center text-slate-900">
          <div>
            <p className="text-2xl font-bold">25+</p>
            <p className="text-xs font-medium uppercase tracking-widest">
              Years
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold">180+</p>
            <p className="text-xs font-medium uppercase tracking-widest">
              Stores
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold">100k+</p>
            <p className="text-xs font-medium uppercase tracking-widest">
              Customers
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold">35+</p>
            <p className="text-xs font-medium uppercase tracking-widest">
              Awards
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold">98+</p>
            <p className="text-xs font-medium uppercase tracking-widest">
              Satisfied
            </p>
          </div>
        </div>
      </section>

      {/* Product Quality Section */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center mb-32">
        <img
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800"
          alt="Product Quality"
          className="rounded-sm w-full h-[500px] object-cover"
        />
        <div className="space-y-6">
          <span className="text-[12px] font-bold uppercase tracking-widest text-slate-400">
            Our Product Quality
          </span>
          <h2 className="text-4xl font-bold leading-tight">
            We Make Things Comfy, <br /> Pretty, and Fancy
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-4">
            <div className="space-y-2">
              <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
                🌱
              </div>
              <h4 className="font-bold">100% Cotton</h4>
              <p className="text-[11px] text-slate-400">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
                🧵
              </div>
              <h4 className="font-bold">Breathable Fabric</h4>
              <p className="text-[11px] text-slate-400">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto px-6 text-center mb-32">
        <span className="text-[12px] font-bold uppercase tracking-widest text-slate-400">
          Our Team
        </span>
        <h2 className="text-4xl font-bold mt-4 mb-16">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <TeamCard
            name="Arlene McCoy"
            role="Fashion Designer"
            img="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400"
          />
          <TeamCard
            name="Bessie Cooper"
            role="Founder & CEO"
            img="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400"
          />
          <TeamCard
            name="Jenny Wilson"
            role="Fashion Designer"
            img="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400"
          />
        </div>
      </section>

      {/* Feature Icons Section */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 py-16 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <Truck className="text-orange-400" size={32} strokeWidth={1.5} />
          <div>
            <h4 className="font-bold">Free Shipping</h4>
            <p className="text-xs text-slate-400">
              Free shipping for order above $180
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <CreditCard className="text-orange-400" size={32} strokeWidth={1.5} />
          <div>
            <h4 className="font-bold">Flexible Payment</h4>
            <p className="text-xs text-slate-400">
              Multiple secure payment options
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Headphones className="text-orange-400" size={32} strokeWidth={1.5} />
          <div>
            <h4 className="font-bold">24x7 Support</h4>
            <p className="text-xs text-slate-400">We support online all days</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function TeamCard({ name, role, img }) {
  return (
    <div className="text-left group">
      <div className="relative overflow-hidden rounded-sm mb-4">
        <img
          src={img}
          alt={name}
          className="w-full h-[350px] object-cover grayscale transition duration-500 group-hover:grayscale-0"
        />
      </div>
      <h4 className="font-bold text-lg">{name}</h4>
      <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
        {role}
      </p>
    </div>
  );
}

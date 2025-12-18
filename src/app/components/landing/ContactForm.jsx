"use client";

import { submitContactForm } from "@/app/actions/action";
import Button from "@/app/components/ui/Button";
import Container from "@/app/components/ui/Container";
import { useActionState } from "react";

const initialState = {
  message: "",
  errors: {},
  success: false,
};

export default function ContactForm() {
  // useActionState handles the loading state (isPending) and the result (state) automatically
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  return (
    <section
      id="contact"
      className="py-24 bg-nature-500 text-white relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-nature-400 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Info (Same as before) */}
          <div className="space-y-8">
            <div>
              <span className="text-nature-200 font-bold tracking-wider uppercase text-sm">
                Get in Touch
              </span>
              <h2 className="mt-2 font-serif text-4xl md:text-5xl font-bold leading-tight">
                Have a Question or <br />
                <span className="text-nature-200">Want to Hire Us?</span>
              </h2>
            </div>

            <p className="text-nature-100 text-lg leading-relaxed max-w-md">
              Whether you want to book a truck for your private event, suggest a
              new location, or just say hello.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-nature-400 flex items-center justify-center text-xl">
                  📧
                </div>
                <div>
                  <p className="text-sm text-nature-200 font-bold uppercase">
                    Email Us
                  </p>
                  <p className="text-lg">hello@streeteats.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Server Action Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl text-nature-500">
            {state.success ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                  ✓
                </div>
                <h3 className="text-2xl font-serif font-bold">Message Sent!</h3>
                <p className="text-nature-400">{state.message}</p>

                {/* A simple reset button to reload the page or clear state would go here */}
                <button
                  onClick={() => window.location.reload()}
                  className="text-sm underline text-nature-300 hover:text-nature-500"
                >
                  Send another message
                </button>
              </div>
            ) : (
              // NOTE: We use the 'action' prop here, not onSubmit
              <form action={formAction} className="space-y-6">
                {/* Global Error Message */}
                {state.message && !state.success && (
                  <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg">
                    {state.message}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold ml-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name" 
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-xl bg-nature-100/30 border ${
                        state.errors?.name
                          ? "border-red-500"
                          : "border-nature-200"
                      } focus:border-nature-400 outline-none transition-all`}
                    />
                    {state.errors?.name && (
                      <p className="text-xs text-red-500 ml-1">
                        {state.errors.name[0]}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold ml-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-nature-100/30 border ${
                        state.errors?.email
                          ? "border-red-500"
                          : "border-nature-200"
                      } focus:border-nature-400 outline-none transition-all`}
                    />
                    {state.errors?.email && (
                      <p className="text-xs text-red-500 ml-1">
                        {state.errors.email[0]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-bold ml-1">
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 rounded-xl bg-nature-100/30 border border-nature-200 focus:border-nature-400 outline-none transition-all appearance-none"
                    >
                      <option>General Inquiry</option>
                      <option>Catering / Private Event</option>
                      <option>Vendor Application</option>
                      <option>Report an Issue</option>
                    </select>
                    {/* Custom Arrow because appearance-none removes default one */}
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-nature-400">
                      ▼
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold ml-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="How can we help you?"
                    className={`w-full px-4 py-3 rounded-xl bg-nature-100/30 border ${
                      state.errors?.message
                        ? "border-red-500"
                        : "border-nature-200"
                    } focus:border-nature-400 outline-none transition-all resize-none`}
                  ></textarea>
                  {state.errors?.message && (
                    <p className="text-xs text-red-500 ml-1">
                      {state.errors.message[0]}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full py-4 text-lg bg-nature-500 hover:bg-nature-400 text-white shadow-lg disabled:opacity-70 disabled:cursor-wait"
                  disabled={isPending}
                >
                  {isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Field, Label, Switch } from "@headlessui/react";

export default function Contact() {
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) {
      alert("Please agree to the terms and conditions first.");
      return;
    }

    const formData = new FormData(e.target);
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const email = formData.get("email");
    const message = formData.get("message");

    const subject = encodeURIComponent(`New EzStudy Message from ${firstName} ${lastName}`);
    const body = encodeURIComponent(
      `Name: ${firstName} ${lastName}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}`
    );

    window.location.href = `mailto:atanu.saha2004@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div id="contact" className="relative bg-white dark:bg-gray-900 px-4 sm:px-6 py-16 sm:py-24 md:py-32 lg:px-8 scroll-mt-20 sm:scroll-mt-24">
      {/* Decorative Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[40rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:w-[72rem]"
        />
      </div>

      {/* Contact Form */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-red-400 font-['Cambria_Math']">
          Get in Touch
        </h2>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 font-['Cambria_Math']">
          Have questions? Feel free to reach out to us, and we’ll respond as
          soon as possible.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 sm:mt-16 md:mt-20 max-w-xl space-y-4 sm:space-y-6 px-4 sm:px-0"
      >
        {/* Name Fields */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="group">
            <label className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-200 transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 font-['Cambria_Math']">
              First Name
            </label>
            <input
              type="text"
              name="first-name"
              className="mt-1 sm:mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-700 px-3 sm:px-4 py-2.5 text-gray-900 dark:bg-gray-800 dark:text-white shadow-sm focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
              placeholder="Example"
            />
          </div>
          <div className="group">
            <label className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-200 transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 font-['Cambria_Math']">
              Last Name
            </label>
            <input
              type="text"
              name="last-name"
              className="mt-1 sm:mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-700 px-3 sm:px-4 py-2.5 text-gray-900 dark:bg-gray-800 dark:text-white shadow-sm focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
              placeholder="Example"
            />
          </div>
        </div>

        {/* Email */}
        <div className="group">
          <label className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-200 transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 font-['Cambria_Math']">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="mt-1 sm:mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-700 px-3 sm:px-4 py-2.5 text-gray-900 dark:bg-gray-800 dark:text-white shadow-sm focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
            placeholder="example@example.com"
          />
        </div>

        {/* Message */}
        <div className="group">
          <label className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-200 transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 font-['Cambria_Math']">
            Message
          </label>
          <textarea
            name="message"
            rows={4}
            className="mt-1 sm:mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-700 px-3 sm:px-4 py-2.5 text-gray-900 dark:bg-gray-800 dark:text-white shadow-sm focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
            placeholder="How can we help you?"
          />
        </div>

        {/* Agreement Checkbox */}
        <Field className="flex items-center gap-x-4">
          <Switch
            checked={agreed}
            onChange={setAgreed}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${agreed ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-700"
              }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${agreed ? "translate-x-6" : "translate-x-1"
                }`}
            />
          </Switch>
          <Label className="text-sm text-gray-600 dark:text-gray-400 font-['Cambria_Math']">
            I agree to the{" "}
            <Link
              to="/terms-conditions"
              className="relative text-indigo-600 dark:text-indigo-400 font-semibold hover:text-pink-600 dark:hover:text-pink-400 cursor-pointer font-['Cambria_Math']"
            >
              terms & conditions.
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-pink-600 hover:w-full rounded-full"></span>
            </Link>
          </Label>
        </Field>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 dark:from-indigo-500 dark:to-blue-500 dark:hover:from-indigo-600 dark:hover:to-blue-600 px-4 py-3 text-lg font-bold text-white shadow-xl hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 font-['Cambria_Math']"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}

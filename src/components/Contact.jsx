"use client";
import { useState } from "react";
import { Field, Label, Switch } from "@headlessui/react";

export default function Contact() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div id="contact" className="relative bg-white px-6 py-24 sm:py-32 lg:px-8">
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
        <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Get in Touch
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Have questions? Feel free to reach out to us, and we’ll respond as
          soon as possible.
        </p>
      </div>

      <form
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl space-y-6 sm:mt-20"
      >
        {/* Name Fields */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              First Name
            </label>
            <input
              type="text"
              name="first-name"
              className="mt-2 w-full rounded-lg border-gray-300 px-4 py-2 text-gray-900 shadow-md focus:outline-indigo-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Last Name
            </label>
            <input
              type="text"
              name="last-name"
              className="mt-2 w-full rounded-lg border-gray-300 px-4 py-2 text-gray-900 shadow-md focus:outline-indigo-600"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-900">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="mt-2 w-full rounded-lg border-gray-300 px-4 py-2 text-gray-900 shadow-md focus:outline-indigo-600"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-gray-900">
            Message
          </label>
          <textarea
            name="message"
            rows={4}
            className="mt-2 w-full rounded-lg border-gray-300 px-4 py-2 text-gray-900 shadow-md focus:outline-indigo-600"
          />
        </div>

        {/* Agreement Checkbox */}
        <Field className="flex items-center gap-x-4">
          <Switch
            checked={agreed}
            onChange={setAgreed}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              agreed ? "bg-indigo-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                agreed ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </Switch>
          <Label className="text-sm text-gray-600">
            I agree to the{" "}
            <a href="#" className="text-indigo-600 font-semibold">
              terms & conditions.
            </a>
          </Label>
        </Field>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-indigo-500"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}

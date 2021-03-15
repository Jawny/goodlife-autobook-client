import React from "react";
import "./faq.css";

const FAQ = () => {
  const questions = [
    {
      q: "What credentials do I enter?",
      a:
        "Enter the same credentials you use to login to Goodlife. The email field is either your email or the club id on your Goodlife card.",
    },
    {
      q: "My location isn't listed. What do I do?",
      a:
        "If you don't see your location please contact me via the email form or send an email directly to goodlifefitnessauto@gmail.com",
    },
    {
      q: "When will you start automatically booking my workouts?",
      a:
        "Our systems update every 3 minutes before each workout session. So if your scheduled workout is at 7:15AM we update at 7:12AM, if your workout is at 8:15AM we update at 8:12AM, etc.",
    },
  ];

  return (
    <div className="faq-container">
      <div className="faq-title">FAQ</div>
      <ol>
        {questions.map((question) => {
          return (
            <li className="faq-list-container">
              <div className="faq-question">{question.q}</div>
              <div className="faq-answer">{question.a}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default FAQ;

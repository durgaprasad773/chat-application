import React, { useState, useEffect, useRef } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { Message } from './Message';
import { TypingIndicator } from './TypingIndicator';
import { StarterQuestions } from './StarterQuestions';
import { ChatFooter } from './ChatFooter';
import { CTAButtons } from './CTAButtons';
import { EmailFormModal } from './EmailFormModal';
import {
  WIDGET_ID,
  fetchImprovedChatResponse,
  clearImprovedChatSession,
  saveReaction,
  getClinicSettings,
  getStarterQuestions,
  getDoctorDetails,
  fetchUserIP,
  insertUserChatSession,
  trackButtonClick,
} from '../services/chatApi';
import { truncateText, getHeaderMaxLength } from '../utils/helpers';

export function ChatbotFullPage({ config = {} }) {
  // State
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showStarterQuestions, setShowStarterQuestions] = useState(true);
  const [chatbotId, setChatbotId] = useState(null);
  const [userIP, setUserIP] = useState('127.0.0.1');
  const [userChatSessionId, setUserChatSessionId] = useState(null);
  const [sessionTracked, setSessionTracked] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [headerMaxLength, setHeaderMaxLength] = useState(getHeaderMaxLength());
  const [starterQuestions, setStarterQuestions] = useState(null);
  
  // Configuration state
  const [chatConfig, setChatConfig] = useState({
    apiBaseUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? '' : 'https://neurax-python-be-emhfejathhhpe6h3.uksouth-01.azurewebsites.net',
    indexName: 'default',
    welcomeMessage: null,
    clinicName: 'Healthcare AI Assistant',
    logoUrl: '',
    privacyNoticeText: "I'm an AI assistant. Please consult a healthcare professional for medical advice.",
    bookNowText: 'Book Demo',
    bookNowShow: true,
    bookNowUrl: '',
    sendEmailText: 'Send Email',
    sendEmailShow: true,
    ctaTwoText: 'More Info',
    ctaTwoShow: false,
    ctaTwoUrl: '',
    ctaThreeText: 'Contact Us',
    ctaThreeShow: false,
    ctaThreeUrl: '',
    brandColour: '#667eea',
    textColour: '#ffffff',
    ...config
  });

  const messagesEndRef = useRef(null);

  // Initialize chatbot
  useEffect(() => {
    initializeChatbot();

    window.addEventListener('resize', () => {
      setHeaderMaxLength(getHeaderMaxLength());
    });

    return () => {
      window.removeEventListener('resize', () => {
        setHeaderMaxLength(getHeaderMaxLength());
      });
    };
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Session will be created on first message send, not on page load

  const initializeChatbot = async () => {
    try {
      // Use direct widget ID
      const id = WIDGET_ID;
      setChatbotId(id);

      // Fetch IP
      const ip = await fetchUserIP();
      setUserIP(ip);

      // Fetch doctor details
      const details = await getDoctorDetails(id);
      setDoctorDetails(details);

      // Fetch clinic settings
      const settings = await getClinicSettings(id);
      setChatConfig(prev => ({
        ...prev,
        welcomeMessage: settings.IntroMessage || null,
        clinicName: settings.ClinicName || 'Healthcare AI Assistant',
        logoUrl: settings.LogoUrl || '',
        privacyNoticeText: settings.PrivacyNoticeText || "I'm an AI assistant. Please consult a healthcare professional for medical advice.",
        privacyNoticeUrl: settings.PrivacyNoticeUrl || '',
        bookNowUrl: settings.BookNowUrl || '',
        bookNowText: settings.BookNowLabel || 'Book Demo',
        bookNowShow: settings.BookNowShow === 'True',
        sendEmailText: settings.SendAnEmailLabel || 'Send Email',
        sendEmailShow: settings.SendAnEmailShow === 'True',
        ctaTwoUrl: settings.CTATwoUrl || '',
        ctaTwoText: settings.CTATwoLabel || 'More Info',
        ctaTwoShow: settings.CTATwoShow === 'True',
        ctaThreeUrl: settings.CTAThreeUrl || '',
        ctaThreeText: settings.CTAThreeLabel || 'Contact Us',
        ctaThreeShow: settings.CTAThreeShow === 'True',
        brandColour: settings.BrandColour || '#667eea',
        textColour: settings.TextColour || '#ffffff'
      }));

      // Fetch starter questions
      const questions = await getStarterQuestions(id);
      setStarterQuestions(questions);

      // Set intro message if available
      if (settings.IntroMessage) {
        setMessages([
          {
            id: 1,
            text: settings.IntroMessage,
            sender: 'bot',
            timestamp: new Date()
          }
        ]);
      }
    } catch (error) {
      console.error('Failed to initialize chatbot:', error);
    }
  };

  const getChatbotDisplayName = () => {
    if (doctorDetails?.DoctorFirstName) {
      return `Ask Dr. ${doctorDetails.DoctorFirstName}`;
    }
    return 'AI Assistant';
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const trackSession = async () => {
    if (userIP && chatbotId && !sessionTracked) {
      try {
        const sessionId = await insertUserChatSession(userIP, chatbotId);
        setUserChatSessionId(sessionId);
        setSessionTracked(true);
        console.log('Session tracked:', sessionId);
      } catch (error) {
        console.error('Failed to track session:', error);
      }
    }
  };

  const handleReaction = async (messageId, sessionId, reaction) => {
    try {
      const currentMessage = messages.find(msg => msg.message_id === messageId);
      if (!currentMessage) return;

      const newReaction = currentMessage.userReaction === reaction ? null : reaction;

      setMessages(prev =>
        prev.map(msg =>
          msg.message_id === messageId ? { ...msg, userReaction: newReaction } : msg
        )
      );

      await saveReaction(sessionId, messageId, newReaction, chatbotId, chatConfig.apiBaseUrl);
    } catch (error) {
      console.error('Error saving reaction:', error);
      setMessages(prev =>
        prev.map(msg =>
          msg.message_id === messageId ? { ...msg, userReaction: null } : msg
        )
      );
    }
  };

  const handleSendMessage = async (message) => {
    if (!message.trim() || isLoading) return;

    setShowStarterQuestions(false);

    // Create session on first message if not already created
    let sessionId = userChatSessionId;
    if (!userChatSessionId && userIP && chatbotId) {
      try {
        sessionId = await insertUserChatSession(userIP, chatbotId);
        setUserChatSessionId(sessionId);
        setSessionTracked(true);
        console.log('Session created on first message:', sessionId);
      } catch (error) {
        console.error('Failed to create session:', error);
        return;
      }
    }

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetchImprovedChatResponse(
        message,
        sessionId,
        chatbotId,
        chatConfig.apiBaseUrl
      );

      const botMessage = {
        id: Date.now() + 1,
        text: response.response || response.message || 'Sorry, I could not process your request.',
        sender: 'bot',
        timestamp: new Date(),
        message_id: response.message_id,
        session_id: response.session_id || userChatSessionId,
        userReaction: null,
        followUpQuestion: response.follow_up_question,
        suggestedTopics: response.suggested_topics
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStarterQuestion = async (questionText, answerText = null) => {
    if (isLoading) return;

    setShowStarterQuestions(false);

    // Create session on first message if not already created
    let sessionId = userChatSessionId;
    if (!userChatSessionId && userIP && chatbotId) {
      try {
        sessionId = await insertUserChatSession(userIP, chatbotId);
        setUserChatSessionId(sessionId);
        setSessionTracked(true);
        console.log('Session created on first message:', sessionId);
      } catch (error) {
        console.error('Failed to create session:', error);
        return;
      }
    }

    const userMessage = {
      id: Date.now(),
      text: questionText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    if (answerText) {
      const botMessage = {
        id: Date.now() + 1,
        text: answerText,
        sender: 'bot',
        timestamp: new Date(),
        userReaction: null,
        followUpQuestion: null,
        suggestedTopics: null
      };

      setMessages(prev => [...prev, botMessage]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetchImprovedChatResponse(
        questionText,
        sessionId,
        chatbotId,
        chatConfig.apiBaseUrl
      );

      const botMessage = {
        id: Date.now() + 1,
        text: response.response || response.message || 'Sorry, I could not process your request.',
        sender: 'bot',
        timestamp: new Date(),
        message_id: response.message_id,
        session_id: response.session_id || userChatSessionId,
        userReaction: null,
        followUpQuestion: response.follow_up_question,
        suggestedTopics: response.suggested_topics
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowUp = (question) => {
    const input = document.querySelector('textarea[placeholder="Type your question..."]');
    if (input) {
      input.value = question;
      input.focus();
    }
  };

  const handleTopic = (topic) => {
    const input = document.querySelector('textarea[placeholder="Type your question..."]');
    if (input) {
      input.value = `Tell me about ${topic}`;
      input.focus();
    }
  };

  const handleBookNow = async () => {
    if (userChatSessionId) {
      try {
        await trackButtonClick(userChatSessionId, chatConfig.bookNowText, chatbotId);
      } catch (error) {
        console.error('Failed to track Book Now click:', error);
      }
    }

    if (chatConfig.bookNowUrl) {
      window.open(chatConfig.bookNowUrl, '_blank');
    } else {
      alert('Book Now: Please call us at your clinic number or visit our website to book an appointment.');
    }
  };

  const handleSendEmail = async () => {
    if (userChatSessionId) {
      try {
        await trackButtonClick(userChatSessionId, chatConfig.sendEmailText, chatbotId);
      } catch (error) {
        console.error('Failed to track Send Email click:', error);
      }
    }

    setShowEmailForm(true);
  };

  const handleCTATwo = async () => {
    if (userChatSessionId) {
      try {
        await trackButtonClick(userChatSessionId, chatConfig.ctaTwoText, chatbotId);
      } catch (error) {
        console.error('Failed to track CTA Two click:', error);
      }
    }

    if (chatConfig.ctaTwoUrl) {
      window.open(chatConfig.ctaTwoUrl, '_blank');
    } else {
      alert(`${chatConfig.ctaTwoText}: Please contact us for more information.`);
    }
  };

  const handleCTAThree = async () => {
    if (userChatSessionId) {
      try {
        await trackButtonClick(userChatSessionId, chatConfig.ctaThreeText, chatbotId);
      } catch (error) {
        console.error('Failed to track CTA Three click:', error);
      }
    }

    if (chatConfig.ctaThreeUrl) {
      window.open(chatConfig.ctaThreeUrl, '_blank');
    } else {
      alert(`${chatConfig.ctaThreeText}: Please contact us for more information.`);
    }
  };

  const getLatestBotMessageIndex = () => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].sender === 'bot' && !messages[i].isError) {
        return i;
      }
    }
    return -1;
  };

  const latestBotMessageIndex = getLatestBotMessageIndex();

  return (
    <div className="w-full h-full flex flex-col bg-white" style={{ maxHeight: '100%' }}>
      {/* Header */}
      <ChatHeader
        clinicName={truncateText(chatConfig.clinicName, headerMaxLength)}
        logoUrl={chatConfig.logoUrl}
        onClose={() => {}}
        brandColour={chatConfig.brandColour}
        showClose={false}
      />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-5 py-5">
        {messages.map((message, index) => (
          <Message
            key={message.id}
            message={message}
            onReaction={handleReaction}
            onFollowUp={handleFollowUp}
            onTopic={handleTopic}
            isLatestBotMessage={index === latestBotMessageIndex}
            brandColour={chatConfig.brandColour}
          />
        ))}

        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-100 border border-gray-200 px-4 py-3 rounded-2xl">
              <TypingIndicator />
            </div>
          </div>
        )}

        {showStarterQuestions && starterQuestions && (
          <StarterQuestions
            questions={starterQuestions}
            onSelectQuestion={handleStarterQuestion}
            isLoading={isLoading}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* CTA Buttons */}
      <CTAButtons
        bookNowShow={chatConfig.bookNowShow}
        bookNowText={chatConfig.bookNowText}
        bookNowUrl={chatConfig.bookNowUrl}
        sendEmailShow={chatConfig.sendEmailShow}
        sendEmailText={chatConfig.sendEmailText}
        ctaTwoShow={chatConfig.ctaTwoShow}
        ctaTwoText={chatConfig.ctaTwoText}
        ctaTwoUrl={chatConfig.ctaTwoUrl}
        ctaThreeShow={chatConfig.ctaThreeShow}
        ctaThreeText={chatConfig.ctaThreeText}
        ctaThreeUrl={chatConfig.ctaThreeUrl}
        onBookNow={handleBookNow}
        onSendEmail={handleSendEmail}
        onCTATwo={handleCTATwo}
        onCTAThree={handleCTAThree}
        brandColour={chatConfig.brandColour}
      />

      {/* Input Area */}
      <ChatInput
        disabled={isLoading}
        onSendMessage={handleSendMessage}
        brandColour={chatConfig.brandColour}
      />

      {/* Footer */}
      <ChatFooter />

      {/* Email Form Modal */}
      <EmailFormModal
        isOpen={showEmailForm}
        onClose={() => setShowEmailForm(false)}
        chatbotId={chatbotId}
        brandColour={chatConfig.brandColour}
      />
    </div>
  );
}

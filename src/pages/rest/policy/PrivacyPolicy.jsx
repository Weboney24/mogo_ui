/* eslint-disable react/prop-types */
import HeaderHelper from "../../../customerSideUI/Home/HeaderHelper";

const termsData = [
  {
    heading: "PRIVACY POLICY",
    content: ["We are appreciative of your faith in us and understand the significance of safe online transactions and data privacy. This Privacy Policy explains how your personal information is collected, used, shared, and processed by Themogo Internet Private Limited and its affiliates (collectively, 'themogo, we, our, us') via the Themogo website, mobile application, and m-site (collectively, the 'Platform').", "Although you are free to explore certain areas of the Platform without providing any information to us, please be aware that we do not ship any goods or services outside of India using this Platform. You explicitly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use, and the applicable terms and conditions of any service or product by using this Platform, giving information about yourself, or using any product or service. You also agree to be governed by the laws of India, including but not limited to those that are relevant to data protection and privacy. Please do not use or access our platform if you disagree."],
  },
  {
    heading: "Collection of Your Information",
    content: ["We gather and save your information that you occasionally supply when using our platform. You can generally use the Platform without disclosing any personal information about yourself or identifying yourself to us. You are no longer anonymous to us after you provide us with your personal information. Whenever feasible, we make it clear which fields are necessary and which are not. You can always elect not to use a specific service, product, or feature on the Platform in order to withhold information.", "We might keep tabs on your purchasing patterns, preferences, and any other data you voluntarily enter onto our platform. In order to better understand, safeguard, and support our users, we use this data for internal research on the demographics, interests, and behavior of our users. A combined analysis and compilation of this data is done. This data could include your IP address, your computer browser information, the URL you just came from (and whether it is on our platform or not), and the URL you go to next (also on our platform or not).", "While you register for an account, deal with us, or take part in any event or contest, we may gather personal information (such as email address, delivery address, name, phone number, credit card/debit card, and other payment instrument details) from you. While you are not required to register in order to access certain areas of our Platform, doing so is necessary in order to place orders and use our online services and content. We give you offers based on your interests and past orders using your contact information.", "We may gather personal correspondence, emails, and letters that you send us, as well as correspondence from other users or third parties regarding your postings or activities on the Platform, into a file that is unique to you.", "Some third-party business partners that are experts in areas such as online movie ticket booking, travel ticket reservations, online bill payment, and more have been added to the TheMogo platform (Ultra-Partners). If you use Ultra-Partners' services, you will be taken to their websites or applications; your access to these will be determined by your TheMogo login information, which will be used to obtain your consent before sharing any further information. We ask that you review the privacy policies of Ultra-Partners before providing any information, as TheMogo is not liable for the practices or content of these policies."],
  },

  {
    heading: "User Accounts",
    content: "In order to access certain features of the Site or use the Services, you must create an account with Mogo. You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your account information, including your password, and for all activity that occurs under your account. You agree to notify Mogo immediately of any unauthorized use of your account or password, or any other breach of security.",
  },
  {
    heading: "Listing and Selling Products",
    content: "As a seller on Mogo, you agree to comply with all applicable laws and regulations. You are solely responsible for the products you list and sell on the Site, including but not limited to, the accuracy of the product description, pricing, and shipping information. You agree to fulfill all orders promptly and to the buyer’s satisfaction. Mogo may remove or suspend any listing that violates these terms and conditions.",
  },
  {
    heading: "Buying Products",
    content: "As a buyer on Mogo, you agree to comply with all applicable laws and regulations. You are solely responsible for the purchases you make on the Site, including but not limited to, reviewing the product description, pricing, and shipping information. You agree to pay for all purchases promptly and to contact the seller or Mogo if there are any issues with the product.",
  },
  {
    heading: "Payment",
    content: "Mogo uses third-party payment processors to facilitate transactions. Mogo is not responsible for any errors, fees, or other issues related to these payment processors. You agree to pay all fees associated with your use of the Site and the Services.",
  },
  {
    heading: "Intellectual Property",
    content: "Mogo owns all intellectual property rights related to the Site and the Services, including but not limited to, trademarks, logos, and copyrights. You may not use any of Mogo’s intellectual property without prior written consent.",
  },
  {
    heading: "Disclaimer of Warranties",
    content: "Mogo provides the Site and the Services 'as is' and without warranty of any kind. Mogo makes no representations or warranties, express or implied, including but not limited to, warranties of merchantability, fitness for a particular purpose, and non-infringement.",
  },
  {
    heading: "Limitation of Liability",
    content: "Mogo is not liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Site or the Services, even if Mogo has been advised of the possibility of such damages. Mogo’s total liability in connection with the Site or the Services is limited to the fees paid by you for the use of the Services.",
  },
  {
    heading: "Indemnification",
    content: "You agree to indemnify and hold harmless Mogo, its affiliates, and their respective officers, directors, employees, and agents from any and all claims, damages, expenses, or liabilities arising out of or related to your use of the Site or the Services, your violation of these terms and conditions.",
  },
];

const PrivacySection = ({ heading, content }) => (
  <div className="terms-section">
    <h1 className="py-2 font-bold">{heading}</h1>
    <p>{content}</p>
  </div>
);

const PrivacyPolicy = () => {
  return (
    <div className="pt-10 w-screen  px-4 md:px-8 lg:px-16 font-Poppins pb-10">
      <HeaderHelper first_name="Privacy Policy" second_name="" />
      <br />
      <div className="space-y-5 font-serif">
        {termsData.map((term, index) => (
          <PrivacySection key={index} heading={term.heading} content={term.content} />
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;

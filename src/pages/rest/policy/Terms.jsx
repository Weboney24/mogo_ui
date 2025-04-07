/* eslint-disable react/prop-types */
import HeaderHelper from "../../../customerSideUI/Home/HeaderHelper";

const termsData = [
  {
    heading: "Terms & Conditions",
    content: "Welcome to Mogo! These terms and conditions (the “Agreement”) govern your use of the Mogo website (the “Site”) and the services offered by Mogo (the “Services”). Please read these terms carefully before using the Site or the Services. By using the Site or the Services, you agree to be bound by these terms and conditions.",
  },
  {
    heading: "Description of Services:",
    content: "Mogo is an e-commerce website that allows users to buy and sell products, including but not limited to, fashion, beauty, home and garden, electronics, and more. Mogo provides a platform for buyers and sellers to connect and facilitate transactions. Mogo is not responsible for the quality, safety, or legality of any products listed on the Site.",
  },
  {
    heading: "User Accounts:",
    content: "In order to access certain features of the Site or use the Services, you must create an account with Mogo. You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your account information, including your password, and for all activity that occurs under your account. You agree to notify Mogo immediately of any unauthorized use of your account or password, or any other breach of security.",
  },
  {
    heading: "Listing and Selling Products:",
    content: "As a seller on Mogo, you agree to comply with all applicable laws and regulations. You are solely responsible for the products you list and sell on the Site, including but not limited to, the accuracy of the product description, pricing, and shipping information. You agree to fulfill all orders promptly and to the buyer’s satisfaction. Mogo may remove or suspend any listing that violates these terms and conditions.",
  },
  {
    heading: "Buying Products:",
    content: "As a buyer on Mogo, you agree to comply with all applicable laws and regulations. You are solely responsible for the purchases you make on the Site, including but not limited to, reviewing the product description, pricing, and shipping information. You agree to pay for all purchases promptly and to contact the seller or Mogo if there are any issues with the product.",
  },
  {
    heading: "Payment:",
    content: "Mogo uses third-party payment processors to facilitate transactions. Mogo is not responsible for any errors, fees, or other issues related to these payment processors. You agree to pay all fees associated with your use of the Site and the Services.",
  },
  {
    heading: "Intellectual Property:",
    content: "Mogo owns all intellectual property rights related to the Site and the Services, including but not limited to, trademarks, logos, and copyrights. You may not use any of Mogo’s intellectual property without prior written consent.",
  },
  {
    heading: "Privacy Policy:",
    content: "Mogo respects your privacy and has a Privacy Policy that explains how we collect, use, and disclose information. By using the Site or the Services, you agree to be bound by the Privacy Policy.",
  },
  {
    heading: "Disclaimer of Warranties:",
    content: "Mogo provides the Site and the Services “as is” and without warranty of any kind. Mogo makes no representations or warranties, express or implied, including but not limited to, warranties of merchantability, fitness for a particular purpose, and non-infringement.",
  },
  {
    heading: "Limitation of Liability:",
    content: "Mogo is not liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Site or the Services, even if Mogo has been advised of the possibility of such damages. Mogo’s total liability in connection with the Site or the Services is limited to the fees paid by you for the use of the Services.",
  },
  {
    heading: "Indemnification:",
    content: "You agree to indemnify and hold harmless Mogo, its affiliates, and their respective officers, directors, employees, and agents from any and all claims, damages, expenses, or liabilities arising out of or related to your use of the Site or the Services, your violation of these terms and conditions.",
  },
];

const TermsSection = ({ heading, content }) => (
  <div className="terms-section">
    <h1 className="py-2 font-bold">{heading}</h1>
    <p>{content}</p>
  </div>
);

const Terms = () => {
  return (
    <div className="pt-10 w-screen  px-4 md:px-8 lg:px-16 font-Poppins pb-10">
      <HeaderHelper first_name="Terms & Conditions" second_name="" />
      <br />
      <div className="space-y-5 font-serif">
        {termsData.map((term, index) => (
          <TermsSection key={index} heading={term.heading} content={term.content} />
        ))}
      </div>
    </div>
  );
};

export default Terms;

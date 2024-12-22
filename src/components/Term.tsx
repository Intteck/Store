import React from "react";
import { Link } from "react-router-dom";
import "./About.css";
import Footer from "./Footer";
import Nav from "./Nav";

 interface Props {
   data: [customerDetails: CustomerDetails, 
    Products: ProductItem[] | null];
 }


 type ProductItem = {
   id: number;
   name: string;
   description: string;
   image_URL: string;
   product_Type: productType[];
   price: number;
   suppliers: [];
 };

 type productType = {
   id: number;
   name: string;
   description: string;
 };


 type CustomerDetails = {
   id: number;
   first_name: string;
   last_name: string;
   dob: string;
   email: string;
   phone_number: string;
   address: string;
   country: string;
   state: string;
   postalCode: string;
   city: string;
   wallet_amt: number;
   wishlist: string[];
 };


const Term = (props: Props) => {
  const { data } = props;
  const [customerDetails, Products] = data;

  return (
    <>
      <Nav data={[customerDetails,Products]} />
      <div className="About-container">
        <Link
          to={"/Home"}
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="600"
        >
          <img src="src\assets\Preak Mart.jpg" alt="" />
        </Link>
        <h1
          className="About-header"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          TERMS AND CONDITIONS
        </h1>

        <h2>Item Purchase and Payment Options:</h2>
        <p>
          Items in the Preak Mart App are primarily to be purchased on
          installment. However, a buyer who desires to buy outrightly may select
          the one-off payment option. Buyers may change their chosen installment
          plan anytime before the delivery of the item(s) is being processed.
        </p>

        <h2>Order Approval:</h2>
        <p>All orders for purchase are subject to approval.</p>

        <h2>Installment Plan Details:</h2>
        <p>
          The Installment Plan allows a buyer to pay for an order in equal
          consecutive installments of desired even numbers of weeks or months
          (e.g., 4 weeks, 2 months, 6 months, etc.). Any duration for payment
          chosen by a buyer must run its course and the buyer cannot review the
          period once the item(s) has been processed for delivery. Buyers can
          request to change their installment plan before reaching the midpoint
          of the chosen installment plan or before delivery is processed. For
          instance, a buyer who selects a 6-month duration can request delivery
          after 3 months, provided that 50% of the purchase price has been paid
          as per the chosen installment plan.
        </p>

        <h2>Midpoint Payment Terms:</h2>
        <p>
          A buyer who pays up 50% of the purchase price before half of the
          chosen duration (midpoint) for payment runs its course shall only be
          entitled to request delivery when half of the chosen duration for
          payment (midpoint) is reached. A buyer who pays up 50% of the purchase
          price as and when due shall be entitled to request delivery 15 days
          after the midpoint is reached.
        </p>

        <h2>Changing the Installment Plan:</h2>
        <p>
          The installment plan may be changed only 10 days before the midpoint
          of the chosen installment plan provided that if the review extends the
          payment period beyond what was earlier chosen, the buyer shall have to
          wait until the midpoint of the new chosen period is reached before
          requesting delivery.
        </p>

        <h2>Process for Changing Installment Duration/Plan:</h2>
        <ul>
          <li>
            Go to the “History” tab on the Preak Mart app, click on order, click
            on more options, and proceed to change the installment plan.
          </li>
          <li>
            Wait for approval from Preak Mart indicating whether the proposed new
            duration is acceptable. Until approval is received, the initially
            chosen duration will continue to run its course.
          </li>
          <li>
            Once the change is approved, the buyer must immediately pay any due
            amount under the approved plan.
          </li>
        </ul>

        <h2>Delivery and Payment Conditions:</h2>
        <p>
          Buyers are liable to pay for the delivery of item(s) ordered before
          delivery is processed. Installment plans attract no processing fee,
          additional cost, or hidden charges, but processing fees by payment
          gateway service providers and delivery fees are applicable and must be
          paid before delivery. Preak Mart may test the validity of a
          subscriber’s payment card by debiting the account, and this sum will
          be kept in the subscriber’s Money Box.
        </p>

        <h2>Subscription and Eligibility:</h2>
        <p>
          To subscribe to an Installment Plan on the Preak Mart App, buyers must:
        </p>
        <ul>
          <li>Register or sign in on the Preak Mart App.</li>
          <li>
            Browse, select desired items, and choose the installment plan.
          </li>
          <li>Provide required details and start the installment.</li>
          <li>
            Add payment card details to enable Preak Mart to automate payment.
          </li>
        </ul>

        <h2>Delivery Conditions:</h2>
        <p>
          Delivery of ordered items is subject to availability at the midpoint
          of the chosen installment plan. The price payable on items purchased
          on the Installment Plan is the current price at the midpoint of the
          installment plan duration.
        </p>

        <h2>Refunds and Termination:</h2>
        <p>
          Buyers may request to terminate the Installment Plan anytime before
          delivery. Refunds of payments made before the termination date are
          subject to a 10% deduction of the total installment sum already paid.
          No refund will be made earlier than 30 days from the termination date.
        </p>

        <h2>Insurance Terms:</h2>
        <p>
          Insurance is optional and costs 10% of the item price. It covers
          repair or replacement not covered by the manufacturer's warranty, with
          the customer paying 20% of the cost. Claims can be made only after
          completing the payment for the item and bearing logistics costs.
        </p>

        <h2>Disclaimer:</h2>
        <p>
          Preak Mart is not the manufacturer of any product listed on the app and
          shall not be liable for any errors, defects, or damages resulting from
          the use of any purchased items. All listed items come with the
          manufacturer’s description and liability for defects or damages lies
          with the manufacturer.
        </p>

        <h2>Money Inbox:</h2>
        <p>
          Money Inbox is a temporary place to hold money before paying for
          installments. Refunds from the Money Inbox attract a 10% withdrawal
          fee and will only be made after verifying the user’s identity.
        </p>

        <h2>Eligibility Requirements:</h2>
        <p>To be eligible for the Installment Plan, a buyer must:</p>
        <ul>
          <li>Be a registered user of the Preak Mart App.</li>
          <li>Be 18 years old or above.</li>
          <li>Be a Nigerian citizen and resident.</li>
          <li>Be capable of entering into a legally binding contract.</li>
          <li>
            Have a valid and verifiable email address and mobile phone number.
          </li>
          <li>Provide a valid delivery address in Nigeria.</li>
          <li>
            Be an authorized holder of a valid payment card for payment
            automation.
          </li>
          <li>Live or work at an electronically verifiable address.</li>
        </ul>

        <h2>After Sales Support Returns and General Warranty Guidelines:</h2>
        <p>
          Preak Mart After-sales is aimed at helping our customers navigate
          manufacturer warranty and is not an extension of warranty beyond that
          which is provided by the manufacturer.
        </p>

        <h3>Updated on 22/08/2024</h3>

        <h2>After Sales Support and Returns:</h2>
        <ol>
          1. At the point of delivery, customers are to check their items for
          physical damages, breakages, dents and incomplete parts before the
          delivery personnel leaves or take a delivery picture. No reports of
          physical damages, breakages, dents and incomplete parts will be
          attended to after the item has been delivered. Reason: This is because
          Preak Mart checks all items for all forms of physical
          damages/discrepancies before shipping out for delivery or handing over
          to our logistic partners. Any physically observable damage at the
          point of delivery makes the delivery company automatically liable.
          After delivery, it is usually impossible to get the companies to admit
          that they delivered the item in a defective state; they claim the
          customer lost the parts or caused the damage after delivery. Preak Mart
          offers a 7-day return policy after delivery of the item. Customers are
          to check and test the item thoroughly within 7 days after delivery to
          ascertain that it functions well. If the item is defective/has
          issues/malfunctions; customers are to promptly send a video evidence
          of the problem to Preak Mart Aftersales Whatsapp line (+234 701 077
          4262) After 7 days of no report of malfunction, Preak Mart proceeds to
          pay the vendor for the item and all Aftersales issue should be
          directed to the vendor/manufacturer warranty using the most convenient
          means from the options below: Reason: We withhold vendor payment for 7
          days before we pay them with an agreement that if the customer has any
          confirmed/genuine complaint within 7 days, an immediate fix will be
          provided. A fix can be a replacement, a technician visit to ascertain
          if it is an installation/assembly error, in-correct setup, or local
          power source issues. T&Cs apply. 2. Logistics for returns are not
          free: Customers who still wish to explore and get Preak Mart assistance
          in processing returns for items bought will pay for the logistics of
          sending the item to any of our dedicated partner offices and back to
          them Reason: Our vendors do not provide any form of logistics support
          for items to be returned back. Only item
          manufacturers/wholesale/vendors service centers can authorize refund
          or replacement for defective/malfunctional items. In a case with
          issues occurring during or after the 7-day window for return, the item
          will be accessed at the product’s warranty center of the
          vendor/manufacturer, and feedback will then be given on the
          resolution. In a case when the issues persist, only the manufacturer
          can authorize a refund or replacement for the item. To request a
          refund/replacement, • Your item must be in the original packaging and
          in re-saleable condition. • • You will be responsible for paying for
          your own shipping costs for returning your item. Shipping costs are
          non refundable. You will be responsible for delivering the items to
          the pick up point, the pickup point will be determined by the
          manufacturer/vendor service center. • • • Any product that exhibits
          physical damage to the box, packaging, tags or to the product shall
          not be eligible for a refund or replacement. • • Any product that is
          returned without all original packaging and accessories, including the
          retail box, manuals, cables, and all other items originally included
          with the product at the time of delivery shall not be eligible for
          refund or replacement. • Feature Requests and Product Descriptions:
          Requests for features that are not included in the original product
          descriptions will not be entertained. Customers are encouraged to
          review the product specifications carefully before purchase to ensure
          it meets their needs. 5.
        </ol>

        <h2>General Warranty Terms and Conditions:</h2>
        <p>
          These are general terms, some vendors or products might have
          additional/exclusions. What your warranty does not cover: • If being
          used for commercial purpose as hiring of the equipment • • You may not
          make a claim under this warranty unless the defect claimed is due to
          faulty or defective parts or workmanship error. Notice of the alleged
          defects must be given promptly upon discovery. Fouani Nigeria Ltd. is
          not liable in the following situations: • 1. The Appliance is damaged
          by: a. Accident b. Misuse or abuse, including failure to properly
          maintain or service c. Normal wear and tear d. Power surges,
          electrical storm damage or incorrect power supply e. Incomplete or
          improper installation d. Incorrect, improper or inappropriate
          operation e. Natural calamities such as fire, lighting, flood, rain
          etc. 2. 2. The Appliance is modified without authority from the
          Manufacturer or National Distributor in writing. 3. The Appliance
          serial number or warranty seal has been removed or defaced. 4. The
          Appliance has been serviced or repaired by anyone other than Fouani
          Nigeria Ltd. or its Authorized Services Centers. • Physical damage to
          the unit after delivery. • • The relocation or reinstallation and
          setup of the product. • • Gas charging for Air conditioners and
          Refrigerators. • • Damage to the unit due to insufficient, unsuitable
          or inadequate packaging or care. • • The traveling and transport
          costs;if the product is situated outside cities that the
          brands/vendors service center is available.
        </p>

        <h2>Limitation of Liability:</h2>
        <p>To the extent permitted by law:</p>
        <ul>
          <li>
            The manufacturer excludes all warranties other than as contained in
            this document.
          </li>
          <li>
            The manufacturer reserves the right to charge a service fee for
            out-of-warranty repair/service and shall not be liable if the
            conditions are not met.
          </li>
        </ul>
        <h3
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="400"
        ></h3>
        <h3
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="400"
        ></h3>
        <h3
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="400"
        ></h3>
        <h3
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="400"
        ></h3>
        <h3
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="400"
        ></h3>
        <h3
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="400"
        ></h3>
        <h3
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="400"
        ></h3>
        <h3
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="400"
        ></h3>
        <h3
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="400"
        ></h3>
        <h3
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="400"
        ></h3>
        <h3
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="400"
        ></h3>
        <h3
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="400"
        ></h3>
        <h3
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="400"
        ></h3>
        <h3
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="400"
        ></h3>
        <h3
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="400"
        ></h3>
        <h3
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="400"
        ></h3>
        <h3
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="400"
        ></h3>
        <h3
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="400"
        ></h3>
        <h3
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="400"
        ></h3>
        <h3
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="400"
        ></h3>
        <h3
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="400"
        ></h3>
        <h3
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="400"
        ></h3>
        <h3
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="400"
        ></h3>

        <div className="About-options">
          <div data-aos="fade-up" data-aos-duration="1000" className="option">
            <button className="option-icon">
              <img
                src="\src\assets\groups_27dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"
                alt=""
              />
            </button>
            <span>
              <h4 className="option-header">Our Office</h4>
              <h3 className="option-text">
                You can visit us at our office. Block A2 Suite 12FF Aregbeshola
                shopping mall Pako Bus stop, Alimosho-Ipaja Road, Lagos.
              </h3>
            </span>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="option"
            data-aos-delay="300"
          >
            <button className="option-icon">
              <img
                src="\src\assets\call_27dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"
                alt=""
              />
            </button>
            <span>
              <h4 className="option-header">Help Desk</h4>
              <h3 className="option-text">
                You can reach out via call or sms or Whatsapp any day, anytime.
                <a href="tel:+234(0)7010774262">+234(0)7010774262</a>
              </h3>
            </span>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="option"
            data-aos-delay="400"
          >
            <button className="option-icon">
              <img
                src="\src\assets\mail_27dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"
                alt=""
              />
            </button>
            <span>
              <h4 className="option-header">Our Mail</h4>
              <h3 className="option-text">
                Your also mail us{" "}
                <a href="mailto:info@PreakMart.ng">info@PreakMart.ng</a>
              </h3>
            </span>
          </div>
        </div>
      </div>
      <Footer data={[customerDetails]} />
    </>
  );
};
 
export default Term;
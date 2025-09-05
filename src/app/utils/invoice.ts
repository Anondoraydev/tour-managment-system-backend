/* eslint-disable @typescript-eslint/no-explicit-any */
import PDFDocument from "pdfkit";
import AppError from "../errorHelpers/AppError";

export interface IInvoiceData {
  transactionId: string;
  bookingDate: Date;
  userName: string;
  tourTitle: string;
  guestCount: number;
  totalAmount: number;
}

export const generatePdf = async (
  invoiceData: IInvoiceData
): Promise<Buffer<ArrayBufferLike>> => {
  try {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const buffer: Uint8Array[] = [];

      doc.on("data", (chunk) => buffer.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffer)));
      doc.on("error", (err) => reject(err));

      // ========= HEADER =========
      doc
        .fontSize(20)
        .font("Helvetica-Bold")
        .fillColor("#E74C3C")
        .text("TOUR BOOKING INVOICE", { align: "center" });

      doc
        .moveDown(0.5)
        .fontSize(10)
        .font("Helvetica")
        .fillColor("#555")
        .text("TourX Travel Agency", { align: "center" })
        .text("123 Main Street, Dhaka, Bangladesh", { align: "center" })
        .text("Phone: +880-1712345678 | Email: support@tourx.com", {
          align: "center",
        });

      doc.moveDown(2);

      // ========= INVOICE INFO =========
      doc
        .fontSize(14)
        .fillColor("#000")
        .font("Helvetica-Bold")
        .text(`Invoice No: ${invoiceData.transactionId}`, 50, doc.y)
        .font("Helvetica")
        .text(
          `Date: ${invoiceData.bookingDate.toLocaleDateString("en-GB")}`,
          350,
          doc.y - 14
        );

      doc.moveDown(1);

      doc
        .font("Helvetica-Bold")
        .text("Customer Name:", 50, doc.y)
        .font("Helvetica")
        .text(invoiceData.userName, 180, doc.y - 14);

      doc.moveDown(1.5);

      // ========= BOOKING DETAILS =========
      doc
        .fontSize(13)
        .font("Helvetica-Bold")
        .fillColor("#2C3E50")
        .text("Booking Details")
        .moveDown(0.5);

      doc
        .rect(50, doc.y, 500, 70)
        .stroke("#BDC3C7")
        .lineWidth(1);

      const startY = doc.y + 10;
      doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .text("Tour Title", 60, startY)
        .text("Guests", 260, startY)
        .text("Total Amount", 400, startY);

      doc
        .font("Helvetica")
        .fontSize(12)
        .text(invoiceData.tourTitle, 60, startY + 20)
        .text(String(invoiceData.guestCount), 260, startY + 20)
        .text(`TK ${invoiceData.totalAmount.toFixed(2)}`, 400, startY + 20);

      doc.moveDown(6);

      // ========= THANK YOU / FOOTER =========
      doc
        .fontSize(12)
        .font("Helvetica-Oblique")
        .fillColor("#16A085")
        .text("Thank you for booking with TourX!", { align: "center" });

      doc
        .moveDown(2)
        .fontSize(10)
        .fillColor("#7F8C8D")
        .text("This is a system-generated invoice, no signature required.", {
          align: "center",
        });

      doc.end();
    });
  } catch (error: any) {
    console.log(error);
    throw new AppError(401, `Pdf creation error ${error.message}`);
  }
};

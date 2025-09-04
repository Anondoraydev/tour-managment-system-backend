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

export const generatePdf = async (invoiceData: IInvoiceData): Promise<Buffer<ArrayBufferLike>> => {
  try {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const buffer: Uint8Array[] = [];

      doc.on("data", (chunk) => buffer.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffer)));
      doc.on("error", (err) => reject(err));

      // ===== HEADER =====
      doc
        .fontSize(22)
        .font("Helvetica-Bold")
        .fillColor("#2C3E50")
        .text("TravelX Tours & Adventures", { align: "center" });

      doc
        .moveDown(0.5)
        .fontSize(12)
        .font("Helvetica")
        .fillColor("#7F8C8D")
        .text("123 Dhaka Street, Bangladesh | Phone: +880-1712345678", {
          align: "center",
        });

      doc.moveDown(2);

      // ===== INVOICE TITLE =====
      doc
        .fontSize(18)
        .font("Helvetica-Bold")
        .fillColor("#000000")
        .text("INVOICE", { align: "center", underline: true });

      doc.moveDown(1.5);

      // ===== TRANSACTION INFO =====
      doc
        .fontSize(12)
        .fillColor("#2C3E50")
        .text(`Transaction ID : ${invoiceData.transactionId}`)
        .text(
          `Booking Date : ${invoiceData.bookingDate.toLocaleDateString("en-GB")}`
        )
        .text(`Customer : ${invoiceData.userName}`);

      doc.moveDown(1.5);

      // ===== DETAILS BOX =====
      doc
        .rect(50, doc.y, 500, 80)
        .stroke("#BDC3C7")
        .lineWidth(1);

      const startY = doc.y + 10;
      doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .text("Tour Package", 60, startY)
        .text("Guests", 260, startY)
        .text("Total Amount", 400, startY);

      doc.moveDown(1);
      doc
        .font("Helvetica")
        .fontSize(12)
        .text(invoiceData.tourTitle, 60, startY + 20)
        .text(String(invoiceData.guestCount), 260, startY + 20)
        .text(`$${invoiceData.totalAmount.toFixed(2)}`, 400, startY + 20);

      doc.moveDown(6);

      // ===== FOOTER / THANK YOU =====
      doc
        .fontSize(14)
        .font("Helvetica-Oblique")
        .fillColor("#16A085")
        .text("Thank you for booking with TravelX Tours!", { align: "center" });

      doc
        .moveDown(2)
        .fontSize(10)
        .fillColor("#7F8C8D")
        .text("This is a system generated invoice, no signature required.", {
          align: "center",
        });

      doc.end();
    });
  } catch (error: any) {
    console.log(error);
    throw new AppError(401, `Pdf creation error ${error.message}`);
  }
};

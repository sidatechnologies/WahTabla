"use client";

// import { ParsedResponse } from "@/utils/parse-course";
import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Certificate from "./certificate";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ParsedUserResponse } from "@/utils/parse-course";

type Attempt = {
    attemptId: number;
    score: number;
    passed: boolean;
};

type Exam = {
    examId: number;
    weekNumber: number;
    type: string;
    title: string;
    totalMarks: number | null;
    attempts?: Attempt[];
};

type ParsedResponse = {
    [key: string]: {
        courseName: string;
        exams: Exam[];
    };
};

type Props = {
    data: ParsedResponse;
    user: ParsedUserResponse
};

export default function CertificateTable({ data, user }: Props) {
    const [open, setOpen] = useState(false);
    const [selectedCert, setSelectedCert] = useState<any>(null);
    const certRef = useRef<HTMLDivElement>(null);

    const getFormattedDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0"); // months are 0-based
        const year = today.getFullYear();
        return `${day}-${month}-${year}`;
    };

    if (!data || Object.keys(data).length === 0) {
        return (
            <Card className="w-full p-6 bg-transparent border-none shadow-none">
                <p className="text-center text-muted-foreground">
                    No certificates available yet!
                </p>
            </Card>
        );
    }

    // filter only passed final exams
    const certificates = Object.values(data).flatMap((course) =>
        course.exams
            .filter(
                (exam) =>
                    exam.type === "final" &&
                    exam.attempts?.some((a) => a.passed === true)
            )
            .map((exam) => ({
                courseName: course.courseName,
                examTitle: exam.title,
                week: exam.weekNumber,
                grade: exam.totalMarks
            }))
    );

    const handleView = (cert: any) => {
        setSelectedCert(cert);
        setOpen(true);
    };

    const handleDownload = async () => {
        if (!certRef.current) return;

        const canvas = await html2canvas(certRef.current);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("certificate.pdf");
    };

    return (
        <div className="w-full space-y-6">

            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Exam</TableHead>
                        <TableHead>Week</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {certificates.length > 0 ? (
                        certificates.map((cert, idx) => {
                            return (

                                <TableRow key={idx}>
                                    <TableCell>{cert.courseName}</TableCell>
                                    <TableCell>{cert.examTitle}</TableCell>
                                    <TableCell>{cert.week}</TableCell>
                                    <TableCell className="text-right">
                                        <Button onClick={() => handleView(cert)}>View & Print</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                No passed final exams yet.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Certificate Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-auto max-w-none p-0 h-[95vh] overflow-auto p-5">
                    <DialogHeader>
                        <DialogTitle>Certificate Preview</DialogTitle>
                    </DialogHeader>

                    <div className="flex justify-center items-center">
                        <Certificate
                            date={getFormattedDate()}
                            grade={selectedCert?.grade}
                            instrument="Online Application"
                            parentName="------"
                            rollNo={user?.userId}
                            studentName={user?.username}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

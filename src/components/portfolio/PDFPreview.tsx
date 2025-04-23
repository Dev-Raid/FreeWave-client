'use client';

import React, {useState} from 'react';
import {Document, Page, pdfjs} from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// PDF.js 워커 설정
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFPreviewProps {
    file: File | string;
    width?: number;
}

interface DocumentLoadSuccess {
    numPages: number;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({file, width = 300}) => {
    const [, setNumPages] = useState<number | null>(null);

    function onDocumentLoadSuccess({numPages}: DocumentLoadSuccess): void {
        setNumPages(numPages);
    }

    return (
        <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div>로딩 중...</div>}
            error={<div>PDF를 불러올 수 없습니다.</div>}
        >
            <Page
                pageNumber={1}
                width={width}
                renderTextLayer={false}
                renderAnnotationLayer={false}
            />
        </Document>
    );
};

export default PDFPreview;

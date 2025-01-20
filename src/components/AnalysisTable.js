import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

const AnalysisTable = ({ analyses }) => {
  return (
    <div className="w-full">
      {/* Для більших екранів */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Year</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Group</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Total Students</TableHead>
              <TableHead>Grade Distribution</TableHead>
              <TableHead>Quality</TableHead>
              <TableHead>Overall</TableHead>
              <TableHead>Average</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {analyses.map((analysis) => (
              <TableRow key={analysis.id}>
                <TableCell>{analysis.year}</TableCell>
                <TableCell>{analysis.semester}</TableCell>
                <TableCell>{analysis.subject}</TableCell>
                <TableCell>{analysis.id_group}</TableCell>
                <TableCell>{analysis.id_department}</TableCell>
                <TableCell>{analysis.count_stud}</TableCell>
                <TableCell>
                  5: {analysis.count5} | 4: {analysis.count4} | 3: {analysis.count3} | 2: {analysis.count2} | passed: {analysis.passed} | released: {analysis.released} | not_cert: {analysis.not_cert} | acad_leave: {analysis.acad_leave} | expelled: {analysis.expelled}
                </TableCell>
                <TableCell>{analysis.quality}%</TableCell>
                <TableCell>{analysis.overall.toFixed(2)}%</TableCell>
                <TableCell>{analysis.average.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Для мобільних пристроїв */}
      <div className="block md:hidden space-y-4">
        {analyses.map((analysis) => (
          <div
            key={analysis.id}
            className="p-4 bg-white shadow rounded-lg border border-gray-200"
          >
            <p>
              <strong>Year:</strong> {analysis.year}
            </p>
            <p>
              <strong>Semester:</strong> {analysis.semester}
            </p>
            <p>
              <strong>Subject:</strong> {analysis.subject}
            </p>
            <p>
              <strong>Group:</strong> {analysis.id_group}
            </p>
            <p>
              <strong>Department:</strong> {analysis.id_department}
            </p>
            <p>
              <strong>Total Students:</strong> {analysis.count_stud}
            </p>
            <p>
              <strong>Grade Distribution:</strong> 5: {analysis.count5} | 4: {analysis.count4} | 3: {analysis.count3} | 2: {analysis.count2} | passed: {analysis.passed} | released: {analysis.released} | not_cert: {analysis.not_cert} | acad_leave: {analysis.acad_leave} | expelled: {analysis.expelled}
            </p>
            <p>
              <strong>Quality:</strong> {analysis.quality}%
            </p>
            <p>
              <strong>Overall:</strong> {analysis.overall.toFixed(2)}%
            </p>
            <p>
              <strong>Average:</strong> {analysis.average.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisTable;

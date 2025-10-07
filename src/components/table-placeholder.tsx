// components/TablePlaceholder.tsx
import { Skeleton } from "@/components/ui/skeleton";

interface TablePlaceholderProps {
  rowCount?: number;
  colCount?: number;
}

export function TablePlaceholder({
  rowCount = 5,
  colCount = 7,
}: TablePlaceholderProps) {
  return (
    <tbody>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b">
          {Array.from({ length: colCount }).map((_, colIndex) => (
            <td key={colIndex} className="py-3 px-4">
              <Skeleton className="h-4 w-full max-w-[120px]" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
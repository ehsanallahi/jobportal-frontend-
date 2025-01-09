export default function DatePicker({ value, onChange }) {
    return (
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
      />
    );
  }
  
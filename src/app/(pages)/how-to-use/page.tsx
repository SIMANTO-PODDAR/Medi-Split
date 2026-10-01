import { FiEdit2, FiTrash2, FiPercent } from "react-icons/fi";
import { TbBookmarkQuestion, TbHomeQuestion } from "react-icons/tb";

function SectionHeading({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#085698]/10 text-[#085698] shrink-0">
        <Icon className="w-4 h-4" />
      </span>
      <h2 className="text-base font-semibold text-gray-900">{label}</h2>
    </div>
  );
}

function StepBadge({ number }: { number: number }) {
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold shrink-0">
      {number}
    </span>
  );
}

function Step({
  number,
  children,
}: {
  number: number;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
      <StepBadge number={number} />
      <span className="pt-0.5">{children}</span>
    </li>
  );
}

function Tag({
  children,
  color = "gray",
}: {
  children: React.ReactNode;
  color?: "gray" | "blue" | "green" | "red";
}) {
  const colorMap: Record<string, string> = {
    gray: "bg-gray-100 text-gray-700",
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    red: "bg-red-50 text-red-700",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${colorMap[color]}`}
    >
      {children}
    </span>
  );
}

function Card({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <div
      id={id}
      className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6"
    >
      {children}
    </div>
  );
}

export default function HowToUsePage() {
  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-4 sm:py-6 space-y-4">
        {/* Page header */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
            How to Use Medi-Split
          </h1>
          <p className="text-sm text-gray-500">
            A quick guide to get your medicine bill calculated in minutes.
          </p>
        </div>

        {/* ── Section 1 — Home page / Add Product ── */}
        <Card id="medi-split">
          <SectionHeading
            icon={TbHomeQuestion}
            label="'Home' Page — Adding Medicines"
          />

          <p className="text-sm text-gray-600 mb-4">
            The Home page is your main calculator. Use the{" "}
            <strong className="text-gray-900">Add Product</strong> form at the
            top to build your medicine list one item at a time.
          </p>

          <ol className="space-y-3">
            <Step number={1}>
              Type the <strong className="text-gray-900">medicine name</strong>{" "}
              in the Product Name field.
            </Step>
            <Step number={2}>
              Enter the{" "}
              <strong className="text-gray-900">unit price (৳)</strong> and the{" "}
              <strong className="text-gray-900">quantity</strong>.
            </Step>
            <Step number={3}>
              Click <Tag color="gray">Add Product</Tag> or press{" "}
              <Tag color="gray">Enter</Tag>. The medicine appears in the{" "}
              <em>Added Products</em> list below.
            </Step>
            <Step number={4}>Repeat for every medicine in the bill.</Step>
          </ol>
        </Card>

        {/* ── Section 2 — Edit / Delete products in the list ── */}
        <Card>
          <SectionHeading
            icon={FiEdit2}
            label="Edit or Delete a Product in the List"
          />

          <p className="text-sm text-gray-600 mb-4">
            Each row in the <span className="italic">&apos;Added Products&apos;</span> list has two action buttons
            on the right.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <Tag color="blue">
                <FiEdit2 className="w-3 h-3" /> Edit
              </Tag>
              <p className="text-sm text-gray-700">
                Pre-fills the form at the top with that product&apos;s data.
                Change what you need.
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <Tag color="red">
                <FiTrash2 className="w-3 h-3" /> Delete
              </Tag>
              <p className="text-sm text-gray-700">
                Removes the product from the current list immediately. This only
                affects the current session — it does not remove the medicine
                from your saved medicines.
              </p>
            </div>
          </div>
        </Card>

        {/* ── Section 3 — Discount ── */}
        <Card>
          <SectionHeading icon={FiPercent} label="Applying a Discount" />

          <p className="text-sm text-gray-600 mb-4">
            The <strong className="text-gray-900">Discount</strong> section
            appears below your product list once you have added at least one
            medicine.
          </p>

          <ol className="space-y-3">
            <Step number={1}>
              Enter a percentage value between{" "}
              <strong className="text-gray-900">0 and 100</strong> in the
              Discount field.
            </Step>
            <Step number={2}>
              The <em>After Discount</em> column in the product list updates
              instantly for every item.
            </Step>
            <Step number={3}>
              The <strong className="text-gray-900">Summary</strong> section
              (just below) shows the full breakdown: Total Price → Discount
              Amount → <strong className="text-gray-900">Final Payable</strong>.
            </Step>
          </ol>
        </Card>

        {/* ── Section 4 — Clear All (Home) ── */}
        <Card>
          <SectionHeading
            icon={FiTrash2}
            label="Clear All Products (Home Page)"
          />

          <p className="text-sm text-gray-600 mb-3">
            Once your list has products, a{" "}
            <Tag color="gray">
              <FiTrash2 className="w-3 h-3" /> Clear All
            </Tag>{" "}
            button appears at the bottom of the page.
          </p>

          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
              <p>
                Clicking it reveals an inline confirmation -{" "}
                <Tag color="red">Yes, Clear</Tag> or <Tag color="gray">No</Tag>.
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
              Confirming removes all products from the current session and
              resets the discount to zero.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
              <p>
                Your saved medicines are{" "}
                <span className="text-gray-900 font-bold">not</span> deleted -
                only the current working list is cleared.
              </p>
            </li>
          </ul>
        </Card>

        {/* ── Section 5 — Saved Medicines page ── */}
        <Card id="all-medicines">
          <SectionHeading
            icon={TbBookmarkQuestion}
            label="'Saved Medicines' Page"
          />

          <p className="text-sm text-gray-600 mb-4">
            Open the menu and go to{" "}
            <strong className="text-gray-900">Saved Medicines</strong> to see
            every medicine that has been stored in your browser.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <Tag color="blue">
                <FiEdit2 className="w-3 h-3" /> Edit
              </Tag>
              <p className="text-sm text-gray-700">
                Click the pencil icon on any row to edit that medicine&apos;s
                name and price inline. Confirm with <Tag color="green">✓</Tag>{" "}
                or discard with <Tag color="gray">✗</Tag>.
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <Tag color="red">
                <FiTrash2 className="w-3 h-3" /> Delete
              </Tag>
              <p className="text-sm text-gray-700">
                Click the trash icon to permanently remove a single saved
                medicine. This takes effect immediately with no confirmation
                prompt.
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <Tag color="red">
                <FiTrash2 className="w-3 h-3" /> Clear&nbsp;All
              </Tag>
              <p className="text-sm text-gray-700">
                Removes every saved medicine at once. A{" "}
                <strong className="text-gray-900">confirmation modal</strong>{" "}
                will appear — you must click{" "}
                <Tag color="red">Yes, Clear All</Tag> to confirm. This cannot be
                undone.
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}

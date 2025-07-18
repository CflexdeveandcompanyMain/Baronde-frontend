export const submitProduct = async ({
  eImages,
  eamount,
  ebrand,
  ecategory,
  edescription,
  ediscount,
  ekeyword,
  ename,
}: {
  eImages: File[];
  ename: string;
  edescription: string;
  eamount: number;
  ecategory: string;
  ebrand: string;
  ekeyword: string[];
  ediscount: number;
}) => {
  let obj = {
    category: ecategory,
    image: eImages,
    name: ename,
    description: edescription,
    price: eamount,
    brand: ebrand,
    keyword: ekeyword,
    discount: ediscount,
  };
  try {
    const response = await fetch("/api/upload-product", {
      method: "POST",
      body: JSON.stringify(obj),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Product uploaded successfully!");
      localStorage.removeItem("baron:img");
    } else {
      alert(`Error: ${result.message || "Failed to upload product"}`);
    }
  } catch (error) {
    console.error("Upload error:", error);
    alert("Failed to upload product. Please try again.");
  } finally {
    alert("Upload done!");
  }
};

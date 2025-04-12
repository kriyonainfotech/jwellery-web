const sharp = require("sharp");
const cloudinary = require("../config/multerConfig");
const fs = require("fs");
const path = require("path");

const uploadImageToCloudinary = async (file, folder) => {
  try {
    const tempDir = path.join(__dirname, "../temp");

    // Check and create temp directory if it doesn't exist
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const compressedPath = path.join(
      tempDir,
      `compressed-${file.originalname}`
    );

    // Compress image with Sharp (quality = 80)
    await sharp(file.buffer)
      .jpeg({ quality: 80 })
      .toFile(compressedPath)
      .catch((err) => {
        console.error("❌ Sharp compression error:", err);
        throw new Error("Image processing failed");
      });

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(compressedPath, {
      folder: `saaraa/${folder}`,
      use_filename: true,
      unique_filename: false,
    });

    // Clean temp
    fs.unlinkSync(compressedPath);

    return uploadResult.secure_url;
  } catch (err) {
    console.error("❌ Error uploading image to Cloudinary:", err.message);
    throw new Error("Image upload failed");
  }
};

module.exports = uploadImageToCloudinary;
//  const navigate = useNavigate();

//  const [title, setTitle] = useState("");
//  const [description, setDescription] = useState("");
//  const [thumbnail, setThumbnail] = useState(null);
//  const [thumbnailPreview, setThumbnailPreview] = useState(null);
//  const [categoryId, setCategoryId] = useState("");
//  const [categories, setCategories] = useState([]);
//  const [subcategories, setSubcategories] = useState([]);
//  const [subCategoryId, setSubCategoryId] = useState("");
//  const [tags, setTags] = useState("");
//  const [status, setStatus] = useState("active");
//  const [variants, setVariants] = useState([
//    {
//      metalColor: "",
//      carat: "",
//      size: "",
//      diamondDetails: [],
//      priceBreakup: [],
//      totalPrice: "",
//      sku: "",
//      stock: "",
//      weightInGrams: "",
//      images: [],
//    },
//  ]);
//  const [isSubmitting, setIsSubmitting] = useState(false);

//  const handleVariantChange = (index, field, value) => {
//    const updatedVariants = [...variants];
//    updatedVariants[index][field] = value;
//    setVariants(updatedVariants);
//  };

//  const handleVariantImageChange = (index, files) => {
//    const fileArray = Array.from(files);
//    const updatedVariants = [...variants];
//    updatedVariants[index].images = fileArray;
//    setVariants(updatedVariants);
//  };

//  const addNewVariant = () => {
//    setVariants([
//      ...variants,
//      {
//        metalColor: "",
//        carat: "",
//        size: "",
//        diamondDetails: [],
//        priceBreakup: [],
//        totalPrice: "",
//        sku: "",
//        stock: "",
//        weightInGrams: "",
//        images: [],
//      },
//    ]);
//  };

//  const removeVariant = (index) => {
//    const updatedVariants = [...variants];
//    updatedVariants.splice(index, 1);
//    setVariants(updatedVariants);
//  };

//  // categories and subcategories
//  const fetchCategories = async () => {
//    // ✅ Check localStorage first
//    const cached = localStorage.getItem("categories");
//    if (cached) {
//      console.log("📦 Using cached categories from localStorage");
//      setCategories(JSON.parse(cached));
//      return;
//    }

//    // 🧠 If not cached, fetch from API
//    try {
//      console.log("🌐 Fetching categories from API...");
//      const res = await axios.get(`${apiurl}/category/getallcategories`);
//      if (res.data.success && res.data.categories) {
//        setCategories(res.data.categories);
//        localStorage.setItem("categories", JSON.stringify(res.data.categories));
//        console.log("✅ Categories saved to localStorage");
//      } else {
//        console.error("⚠️ No categories received from API");
//      }
//    } catch (err) {
//      console.error("❌ Error fetching categories:", err.message);
//    }
//  };

//  useEffect(() => {
//    fetchCategories();
//  }, []);

//  // const subcategories = [
//  //   { _id: "abc", name: "Rose Gold" },
//  //   { _id: "def", name: "Yellow Gold" },
//  // ];

//  const handleThumbnailChange = (e) => {
//    const file = e.target.files[0];
//    if (file) {
//      setThumbnail(file);
//      setThumbnailPreview(URL.createObjectURL(file));
//    }
//  };

//  const validateVariants = () => {
//    return variants.every(
//      (v) => v.metalColor && v.carat && v.sku && v.images.length > 0
//    );
//  };

//  const handleSubmit = async (e) => {
//    e.preventDefault();
//    setIsSubmitting(true); // Start loading
//    if (!validateVariants()) {
//      toast.error("All variants must have metal color, carat, SKU, and images");
//      return;
//    }
//    const formData = new FormData();

//    formData.append("title", title);
//    formData.append("description", description);
//    formData.append("categoryId", categoryId);
//    formData.append("subCategoryId", subCategoryId);
//    formData.append("status", status);
//    formData.append("tags", tags);

//    // Append thumbnail image
//    if (thumbnail) {
//      formData.append("thumbnail", thumbnail, "thumbnail.jpg"); // Add filename
//    }

//    // Prepare variants
//    const updatedVariants = variants.map((variant, i) => {
//      const { images, ...rest } = variant;
//      return rest; // images will be handled separately
//    });

//    formData.append("variants", JSON.stringify(updatedVariants));

//    // NEW - Clear nested image groups
//    variants.forEach((variant, i) => {
//      variant.images.forEach((file) => {
//        formData.append(`variantImages_${i}`, file);
//      });
//    });

//    console.log("🚀 Submitting formData:", formData);
//    for (let pair of formData.entries()) {
//      console.log(pair[0], pair[1]);
//    }
//    try {
//      const res = await axios.post(`${apiurl}/product/add-product`, formData, {
//        withCredentials: true,
//        headers: {
//          "Content-Type": "multipart/form-data",
//        },
//      });

//      console.log(res, "res");

//      if (res.data.success) {
//        console.log("✅ Product added:", res.data);
//        navigate("/admin/products");
//      } else {
//        console.error("❌ API failed:", res.data.message);
//      }
//    } catch (err) {
//      console.error("🔥 API Error:", err.message);
//    } finally {
//      setIsSubmitting(false); // Stop loading regardless of outcome
//    }
//  };
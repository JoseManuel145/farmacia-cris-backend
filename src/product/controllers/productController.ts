import { Request, Response } from "express";
import productService from "../services/productService";

export const getProducts = async (_req: Request, res: Response) => {
  console.log(33);
  
  try {
    const products = await productService.getAllProducts();
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      console.log('No products found');
      res.status(404).json({ message: "No records found" });
    }
  } catch (error: any) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: error.message });
  }
};


export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(
      parseInt(req.params.product_id, 10)
    );
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const getProductByIdClient = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(
      parseInt(req.params.product_id, 10)
    );
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const createProduct = async (req: Request, res: Response) => {
  console.log(req.file);
  console.log(req.body);
  
  
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const {
      stock,
      name,
      price,
      description,
      formula,
      secundary_effects,
      caducity,
      dose,
      type,
      uso,
      created_by,
    } = req.body;

    // Validación de campos requeridos
    if (!stock || !name || !price || !created_by) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProductData = {
      id: 0, // Temporal, el id real se asignará en la base de datos
      stock,
      name,
      price,
      description: description || "", // Asegura que los campos no obligatorios tengan un valor por defecto
      formula: formula || "",
      secundary_effects: secundary_effects || "",
      caducity: caducity || "",
      dose: dose || "",
      type: type || "",
      uso: uso || "",
      url: "",
      created_by,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      updated_by: "",
      deleted: false,
    };

    const newProduct = await productService.addProduct(newProductData, req.file);
    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const {
      stock,
      name,
      price,
      description,
      formula,
      secundary_effects,
      caducity,
      dose,
      type,
      uso,
      updated_by,
    } = req.body;
    const productId = parseInt(req.params.product_id, 10);

    // Validación de campos requeridos
    if (!stock || !name || !price || !updated_by) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updatedProductData = {
      id: productId,
      stock,
      name,
      price,
      description: description || "",
      formula: formula || "",
      secundary_effects: secundary_effects || "",
      caducity: caducity || "",
      dose: dose || "",
      type: type || "",
      uso: uso || "",
      url: "",
      created_at: new Date().toISOString(), // Add created_at property
      created_by: "", // Add created_by property
      updated_by,
      updated_at: new Date().toISOString(),
      deleted: false,
    };

    const updatedProduct = await productService.modifyProduct(
      productId,
      updatedProductData,
      req.file
    );
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found or update failed" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await productService.deleteProduct(
      parseInt(req.params.product_id, 10)
    );
    if (deleted) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found or delete failed" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

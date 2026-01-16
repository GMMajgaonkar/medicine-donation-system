import Medicine from "../model/MedicineModel.js"

export const addmedine = async (req, res) => {
    try {
       // console.log(req.file)
        const {  email, phone, Medicine_name, quantity, expiry } = req.body;

        if (!email)
            return res.status(400).json({ message: "email requird" })

        if (!phone)
            return res.status(400).json({ message: "phone requird" })

        if (!Medicine_name)
            return res.status(400).json({ message: "Medicine_name requird" })

        if (!quantity)
            return res.status(400).json({ message: "quantity requird" })

        if (!req.file)
            return res.status(400).json({ message: "image requird" })

        if (!expiry)
            return res.status(400).json({ message: "expiry requird" })

        const medicine = new Medicine({
          
            email,
            phone,
            Medicine_name,
            quantity,
            file: req.file.filename, 
            expiry,
            userId: req.user.id  
        })

        const savemedicine = await medicine.save()
        return res.status(200).json({ message: "medicine inserted", savemedicine ,   userId: req.user.id   })
    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error)
    }
}

export const update_medicine = async (req, res) => {
    try {
        const id = req.params.id;
        const newdata = req.body;
        if (req.file) {
      newdata.file = req.file.filename;
    }
        const update = await Medicine.findByIdAndUpdate(id, newdata, { new: true });
        return res.status(200).json(update);
    }
    catch (error) {
        return res.status(500).json({ message: error })
    }
}

export const delete_medicine = async (req, res) => {
    try {
        const id = req.params.id;
        const datadelete = await Medicine.findByIdAndDelete(id);
        return res.status(200).json({ message: "data deleted" });
    }
    catch (error) {
        return res.status(500).json({ message: error })
    }
}

export const getall = async (req, res) => {
    try {
        const data = await Medicine.find({});
        return res.status(200).json({ data })
    } catch (error) {
        return res.status(500).json({ message: error })

    }
}

export const getbyid = async (req, res) => {
  try {
    const id = req.user.id;

    const data = await Medicine.find({ userId: id });

    return res.status(200).json(data); // ✅ ARRAY
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getbymedicineid = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Medicine.find({ _id:id });
//console.log(data)
    return res.status(200).json(data); // ✅ ARRAY
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



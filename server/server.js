const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const LEADS_FILE = path.join(__dirname, 'leads.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read leads from JSON file
const readLeadsFromFile = () => {
  try {
    if (!fs.existsSync(LEADS_FILE)) {
      fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(LEADS_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error('Error reading leads file:', error);
    return [];
  }
};

// Helper function to write leads to JSON file
const writeLeadsToFile = (leads) => {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing to leads file:', error);
    return false;
  }
};

// GET /leads - Fetch all leads
app.get('/leads', (req, res) => {
  const leads = readLeadsFromFile();
  // Sort leads by creation date (newest first)
  const sortedLeads = [...leads].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(sortedLeads);
});

// POST /add-lead - Add a new lead
app.post('/add-lead', (req, res) => {
  const { name, email, phone, status } = req.body;

  // Basic validation
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone number are required fields' });
  }

  // Validate status
  const validStatuses = ['New', 'Contacted', 'Converted'];
  const leadStatus = validStatuses.includes(status) ? status : 'New';

  const leads = readLeadsFromFile();
  
  // Create new lead object
  const newLead = {
    id: `lead_${Date.now()}`,
    name,
    email,
    phone,
    status: leadStatus,
    createdAt: new Date().toISOString()
  };

  leads.push(newLead);
  
  if (writeLeadsToFile(leads)) {
    res.status(201).json(newLead);
  } else {
    res.status(500).json({ error: 'Failed to save lead to storage' });
  }
});

// DELETE /delete-lead/:id - Delete a lead by ID
app.delete('/delete-lead/:id', (req, res) => {
  const { id } = req.params;
  const leads = readLeadsFromFile();
  
  const leadExists = leads.some(lead => lead.id === id);
  if (!leadExists) {
    return res.status(404).json({ error: 'Lead not found' });
  }

  const updatedLeads = leads.filter(lead => lead.id !== id);
  
  if (writeLeadsToFile(updatedLeads)) {
    res.json({ message: 'Lead deleted successfully', id });
  } else {
    res.status(500).json({ error: 'Failed to delete lead from storage' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

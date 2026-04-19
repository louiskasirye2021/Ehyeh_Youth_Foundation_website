import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-667c1a81/health", (c) => {
  return c.json({ status: "ok" });
});

// ===== ADMIN ROUTES =====

// Initialize data routes
app.post("/make-server-667c1a81/admin/init-programs", async (c) => {
  try {
    const { programs } = await c.req.json();
    await kv.set("admin_programs", programs);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error initializing programs:", error);
    return c.json({ error: "Failed to initialize programs" }, 500);
  }
});

app.post("/make-server-667c1a81/admin/init-testimonials", async (c) => {
  try {
    const { testimonials } = await c.req.json();
    await kv.set("admin_testimonials", testimonials);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error initializing testimonials:", error);
    return c.json({ error: "Failed to initialize testimonials" }, 500);
  }
});

app.post("/make-server-667c1a81/admin/init-blog", async (c) => {
  try {
    const { posts } = await c.req.json();
    await kv.set("admin_blog", posts);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error initializing blog:", error);
    return c.json({ error: "Failed to initialize blog" }, 500);
  }
});

app.post("/make-server-667c1a81/admin/init-gallery", async (c) => {
  try {
    const { images } = await c.req.json();
    await kv.set("admin_gallery", images);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error initializing gallery:", error);
    return c.json({ error: "Failed to initialize gallery" }, 500);
  }
});

app.post("/make-server-667c1a81/admin/init-team", async (c) => {
  try {
    const { team } = await c.req.json();
    await kv.set("admin_team", team);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error initializing team:", error);
    return c.json({ error: "Failed to initialize team" }, 500);
  }
});

// Programs Management
app.get("/make-server-667c1a81/admin/programs", async (c) => {
  try {
    const programs = await kv.get("admin_programs");
    return c.json({ programs: programs || [] });
  } catch (error) {
    console.error("Error loading programs:", error);
    return c.json({ error: "Failed to load programs" }, 500);
  }
});

app.post("/make-server-667c1a81/admin/programs", async (c) => {
  try {
    const program = await c.req.json();
    const programs = await kv.get("admin_programs") || [];
    
    const existingIndex = programs.findIndex((p: any) => p.id === program.id);
    if (existingIndex >= 0) {
      programs[existingIndex] = program;
    } else {
      programs.push(program);
    }
    
    await kv.set("admin_programs", programs);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error saving program:", error);
    return c.json({ error: "Failed to save program" }, 500);
  }
});

app.delete("/make-server-667c1a81/admin/programs/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const programs = await kv.get("admin_programs") || [];
    const filtered = programs.filter((p: any) => p.id !== id);
    
    await kv.set("admin_programs", filtered);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting program:", error);
    return c.json({ error: "Failed to delete program" }, 500);
  }
});

// Gallery Management
app.get("/make-server-667c1a81/admin/gallery", async (c) => {
  try {
    const images = await kv.get("admin_gallery");
    return c.json({ images: images || [] });
  } catch (error) {
    console.error("Error loading gallery:", error);
    return c.json({ error: "Failed to load gallery" }, 500);
  }
});

app.post("/make-server-667c1a81/admin/gallery", async (c) => {
  try {
    const image = await c.req.json();
    const images = await kv.get("admin_gallery") || [];
    
    images.push(image);
    await kv.set("admin_gallery", images);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error adding image:", error);
    return c.json({ error: "Failed to add image" }, 500);
  }
});

app.delete("/make-server-667c1a81/admin/gallery/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const images = await kv.get("admin_gallery") || [];
    const filtered = images.filter((img: any) => img.id !== id);
    
    await kv.set("admin_gallery", filtered);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting image:", error);
    return c.json({ error: "Failed to delete image" }, 500);
  }
});

// Team Management
app.get("/make-server-667c1a81/admin/team", async (c) => {
  try {
    const members = await kv.get("admin_team");
    return c.json({ members: members || [] });
  } catch (error) {
    console.error("Error loading team:", error);
    return c.json({ error: "Failed to load team" }, 500);
  }
});

app.post("/make-server-667c1a81/admin/team", async (c) => {
  try {
    const member = await c.req.json();
    const members = await kv.get("admin_team") || [];
    
    const existingIndex = members.findIndex((m: any) => m.id === member.id);
    if (existingIndex >= 0) {
      members[existingIndex] = member;
    } else {
      members.push(member);
    }
    
    await kv.set("admin_team", members);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error saving team member:", error);
    return c.json({ error: "Failed to save team member" }, 500);
  }
});

app.delete("/make-server-667c1a81/admin/team/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const members = await kv.get("admin_team") || [];
    const filtered = members.filter((m: any) => m.id !== id);
    
    await kv.set("admin_team", filtered);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting team member:", error);
    return c.json({ error: "Failed to delete team member" }, 500);
  }
});

// Blog Management
app.get("/make-server-667c1a81/admin/blog", async (c) => {
  try {
    const posts = await kv.get("admin_blog");
    return c.json({ posts: posts || [] });
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return c.json({ error: "Failed to load blog posts" }, 500);
  }
});

app.post("/make-server-667c1a81/admin/blog", async (c) => {
  try {
    const post = await c.req.json();
    const posts = await kv.get("admin_blog") || [];
    
    const existingIndex = posts.findIndex((p: any) => p.id === post.id);
    if (existingIndex >= 0) {
      posts[existingIndex] = post;
    } else {
      posts.push(post);
    }
    
    await kv.set("admin_blog", posts);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error saving blog post:", error);
    return c.json({ error: "Failed to save blog post" }, 500);
  }
});

app.delete("/make-server-667c1a81/admin/blog/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const posts = await kv.get("admin_blog") || [];
    const filtered = posts.filter((p: any) => p.id !== id);
    
    await kv.set("admin_blog", filtered);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return c.json({ error: "Failed to delete blog post" }, 500);
  }
});

// Testimonials Management
app.get("/make-server-667c1a81/admin/testimonials", async (c) => {
  try {
    const testimonials = await kv.get("admin_testimonials");
    return c.json({ testimonials: testimonials || [] });
  } catch (error) {
    console.error("Error loading testimonials:", error);
    return c.json({ error: "Failed to load testimonials" }, 500);
  }
});

app.post("/make-server-667c1a81/admin/testimonials", async (c) => {
  try {
    const testimonial = await c.req.json();
    const testimonials = await kv.get("admin_testimonials") || [];
    
    const existingIndex = testimonials.findIndex((t: any) => t.id === testimonial.id);
    if (existingIndex >= 0) {
      testimonials[existingIndex] = testimonial;
    } else {
      testimonials.push(testimonial);
    }
    
    await kv.set("admin_testimonials", testimonials);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error saving testimonial:", error);
    return c.json({ error: "Failed to save testimonial" }, 500);
  }
});

app.delete("/make-server-667c1a81/admin/testimonials/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const testimonials = await kv.get("admin_testimonials") || [];
    const filtered = testimonials.filter((t: any) => t.id !== id);
    
    await kv.set("admin_testimonials", filtered);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return c.json({ error: "Failed to delete testimonial" }, 500);
  }
});

Deno.serve(app.fetch);
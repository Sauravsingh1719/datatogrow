'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import TiptapEditor from '@/components/TipTapEditor';

export default function NewBlogPost() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Data Visualization',
    readTime: '5 min read',
    tags: [] as string[],
    featured: false,
    published: false
  });
  const [newTag, setNewTag] = useState('');

  const categories = [
    'Data Visualization',
    'Machine Learning',
    'Data Quality',
    'Database',
    'Industry Trends',
    'Communication',
    'Data Engineering'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/blogs');
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleContentChange = (htmlContent: string) => {
    setFormData({
      ...formData,
      content: htmlContent
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">New Blog Post</h1>
          <p className="text-gray-600 mt-1">Create a new blog post for your portfolio</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-300">
            <Eye size={16} className="mr-2" />
            Preview
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save size={16} className="mr-2" />
            {saving ? 'Publishing...' : 'Publish Post'}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Post Title</CardTitle>
                <CardDescription>
                  Add a compelling title for your blog post
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Enter blog post title..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="text-lg font-medium"
                  required
                />
              </CardContent>
            </Card>

            {/* Excerpt */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Excerpt</CardTitle>
                <CardDescription>
                  Write a short description that will appear in blog listings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Enter a brief excerpt..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  required
                />
              </CardContent>
            </Card>

            {/* Content - Updated with Tiptap Editor */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Content</CardTitle>
                <CardDescription>
                  Write your blog post content with rich text editor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TiptapEditor
                  content={formData.content}
                  onChange={handleContentChange}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Publish Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="featured" className="text-sm font-medium">
                    Featured Post
                  </Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="published" className="text-sm font-medium">
                    Publish Immediately
                  </Label>
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Category */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Category</CardTitle>
              </CardHeader>
              <CardContent>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </CardContent>
            </Card>

            {/* Read Time */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Read Time</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="5 min read"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                />
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>
                  Add relevant tags for your post
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <div
                      key={tag}
                      className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
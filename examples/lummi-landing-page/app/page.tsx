'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Camera, Layers, Eraser, Zap, Copy, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { AvatarGroup } from '@/components/AvatarGroup'
import React from 'react';


export default function Home() {
  const [heroImage, setHeroImage] = useState('')

  useEffect(() => {
    fetchRandomImage()
  }, [])

  const fetchRandomImage = async () => {
    try {
      const response = await fetch('/api/random-image')
      const data = await response.json()
      if (data && data[0] && data[0].url) {
        setHeroImage(data[0].url)
      }
    } catch (error) {
      console.error('Error fetching random image:', error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <HeroSection backgroundImage={heroImage} />
        <FeaturesAndGallerySection />
        <IntegrationSection />
        <CTASection />
      </main>

      <footer className="bg-muted">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2025 Lummi API. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function HeroSection({ backgroundImage }: { backgroundImage: string }) {
  return (
    <section className="relative min-h-[80vh] flex items-center">
      {backgroundImage && (
        <Image 
          src={`${backgroundImage}`}
          alt="Hero background" 
          layout="fill" 
          objectFit="cover" 
          className="z-0" 
        />
      )}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div className="container mx-auto px-4 relative z-20 max-w-[960px] flex flex-col min-h-[80vh] justify-center">
        <h1 className="text-l font-semibold text-white opacity-85">Lummi API</h1>
        <div className="max-w-2xl">
          <h2 className="scroll-m-20 text-5xl font-semibold tracking-tight lg:text-7xl mb-3 text-white">
            The Engine for All Your Creative Image Needs
          </h2>
          <p className="text-lg text-muted mb-8 opacity-85">
            Welcome to the Lummi API—your gateway to high-quality, AI-generated visuals that stand out.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="https://api.lummi.ai/developers/api">Apply Now</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="https://api.lummi.ai/developers/api-reference">Documentation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesAndGallerySection() {
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const features = [
    { title: "Adjust with Reframe", description: "Adapt any image to any aspect ratio in seconds.", icon: <Layers className="h-6 w-6" /> },
    { title: "Diverse Visual Styles", description: "Get access to images in Photo, Illustration, and 3D formats.", icon: <Camera className="h-6 w-6" /> },
    { title: "Background Removal", description: "Automatically remove backgrounds from any image.", icon: <Eraser className="h-6 w-6" /> },
    { title: "Fast, Simple, Limitless", description: "Easy integration, unlimited requests, optimized for speed.", icon: <Zap className="h-6 w-6" /> },
  ]

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/random-images')
      const data = await response.json()
      if (Array.isArray(data)) {
        setImages(data);
      } else {
        console.error('Unexpected response format:', data);
        setImages([]);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="features" className="py-40 pb-0 bg-muted overflow-hidden">
      <div className="w-full">
        <h2 className="scroll-m-20 text-4xl font-semibold tracking-tight transition-colors first:mt-0 mb-12 text-center">What the Lummi API Can Do for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 max-w-screen-lg mx-auto">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex flex-col items-start">
                  {React.cloneElement(feature.icon, { className: "h-6 w-6 text-gray-400" })}
                  <CardTitle className="mt-2 font-semibold">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {isLoading ? (
          <div className="text-center">Loading gallery...</div>
        ) : (
          <AnimatedGallery images={images} />
        )}
      </div>
    </section>
  )
}

function AnimatedGallery({ images }: { images: any[] }) {
  const rowImages = [
    images.slice(0, 8),
    images.slice(8, 16),
    [...images.slice(16, 20), ...images.slice(0, 4)], // Repeat first 4 images to fill the third row
  ]

  if (images.length === 0) {
    return <div className="text-center">No images available</div>;
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '600px', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw' }}>
      {rowImages.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          className={`flex animate-scroll ${rowIndex === 1 ? '-ml-[100px]' : rowIndex === 2 ? '-ml-[200px]' : ''}`}
          style={{
            animationDuration: rowIndex === 0 ? '60s' : rowIndex === 1 ? '80s' : '100s',
            position: 'absolute',
            top: `${rowIndex * 200}px`,
            marginBottom: '20px',
          }}
        >
          {[...row, ...row].map((image: any, index: number) => (
            <div key={index} className="relative w-[240px] h-[180px] flex-shrink-0 mx-[10px]">
              {image && image.url && (
                <Image 
                  src={`${image.url}?auto=format&w=400&ar=1.33`}
                  alt={image.description || ''}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function IntegrationSection() {
  const [isCopied, setIsCopied] = useState(false)
  const codeSnippet = `
const API_KEY = 'your_api_key_here';

async function searchImages(query) {
  const response = await fetch(\`https://api.lummi.ai/v1/images/search?query=\${query}\`, {
    headers: {
      'Authorization': \`Bearer \${API_KEY}\`
    }
  });
  const data = await response.json();
  return data;
}

// Usage
searchImages('landscape')
  .then(images => console.log(images))
  .catch(error => console.error('Error:', error));
`

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <section id="integrate" className="py-40 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="lg:w-1/2 w-full">
            <h2 className="scroll-m-20 text-4xl font-semibold tracking-tight transition-colors first:mt-0 mb-6">Easy to Integrate</h2>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Lummi API seamlessly fits into your existing workflow, allowing you to harness the power of AI-generated visuals with just a few lines of code.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Our RESTful API is designed for developers, by developers, ensuring a smooth integration process that saves you time and effort.
            </p>
            
          </div>
          <div className="lg:w-1/2 w-full">
            <Card>
              <CardHeader>
                <CardTitle className="text-md text-muted-foreground mb-0">Sample Code</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Here's how easy it is to use the Lummi API:</p>
                <pre className="bg-muted p-4 pt-12 rounded-lg overflow-x-auto relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="absolute top-2 right-2 z-10"
                  >
                    {isCopied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" /> Copy
                      </>
                    )}
                  </Button>
                  <code className="text-sm">{codeSnippet}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section id="cta" className="py-40 bg-muted">
      <div className="container mx-auto px-4 text-center max-w-screen-md">
        <AvatarGroup />
        <h2 className="scroll-m-20 text-4xl font-semibold tracking-tight transition-colors first:mt-0 mb-2">Ready to Transform Your Visuals?</h2>
        <p className="text-xl text-muted-foreground mb-8">Join the Lummi API community and start creating stunning AI-generated images today.</p>
        <div className="flex justify-center space-x-4">
          <Button asChild size="lg">
            <Link href="https://api.lummi.ai/developers/api">Apply Now</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="https://api.lummi.ai/developers/api-reference">View Documentation</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}


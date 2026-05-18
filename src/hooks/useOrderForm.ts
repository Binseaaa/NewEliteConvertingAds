import { useState } from 'react';
import type { OrderFormData } from '../types';
import { PACKAGE_PRICES, VARIATION_PRICES } from '../data/packages';

const INITIAL_STATE: OrderFormData = {
  productName: '',
  email: '',
  adFormat: '',
  package: '',
  description: '',
  voiceover: false,
  voiceoverAccent: '',
  variations: false,
  variationsQty: '',
  thumbnail: false,
  productImage: null,
  brandLogo: null,
};

export function useOrderForm() {
  const [formData, setFormData] = useState<OrderFormData>(INITIAL_STATE);

  const calcTotal = (): number => {
    let total = PACKAGE_PRICES[formData.package] ?? 0;
    if (formData.voiceover) total += 10;
    if (formData.thumbnail) total += 10;
    if (formData.variations && formData.variationsQty) {
      total += VARIATION_PRICES[formData.variationsQty] ?? 0;
    }
    return total;
  };

  const updateField = <K extends keyof OrderFormData>(key: K, value: OrderFormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => setFormData(INITIAL_STATE);

  const getExtrasLabel = (): string => {
    const extras: string[] = [];
    if (formData.voiceover) {
      extras.push(formData.voiceoverAccent ? `Voiceover (${formData.voiceoverAccent})` : 'Voiceover');
    }
    if (formData.thumbnail) extras.push('Thumbnail — $10');
    if (formData.variations && formData.variationsQty) {
      const labels: Record<string, string> = { '1': '1 Variation — $10', '3': '3 Variations — $25', '5': '5 Variations — $40' };
      extras.push(labels[formData.variationsQty] ?? '');
    }
    return extras.length ? extras.join(' | ') : 'None';
  };

  const readImageAsBase64 = (file: File): Promise<{ name: string; b64: string; mime: string }> =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const b64 = result.split(',')[1] ?? '';
        resolve({ name: file.name, b64, mime: file.type });
      };
      reader.readAsDataURL(file);
    });

  const buildFormData = async (): Promise<FormData> => {
    const fd = new FormData();
    const total = calcTotal();
    const extras = getExtrasLabel();

    const prodImg = formData.productImage
      ? await readImageAsBase64(formData.productImage)
      : { name: '', b64: '', mime: '' };
    const logoImg = formData.brandLogo
      ? await readImageAsBase64(formData.brandLogo)
      : { name: '', b64: '', mime: '' };

    fd.append('productName', formData.productName);
    fd.append('custEmail', formData.email);
    fd.append('adFormat', formData.adFormat);
    fd.append('package', formData.package);
    fd.append('notes', formData.description);
    fd.append('extras', extras);
    fd.append('total', `$${total} USD`);
    fd.append('productImage', prodImg.name || 'Not uploaded');
    fd.append('logoName', logoImg.name || 'Not uploaded');
    fd.append('productB64', prodImg.b64);
    fd.append('productMime', prodImg.mime);
    fd.append('logoB64', logoImg.b64);
    fd.append('logoMime', logoImg.mime);

    return fd;
  };

  return { formData, updateField, calcTotal, resetForm, getExtrasLabel, buildFormData };
}

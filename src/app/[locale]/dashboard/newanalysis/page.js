import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

const AnalysisForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    semester: 1,
    subject: '',
    id_group: '',
    id_department: '',
    count_stud: 0,
    count5: 0,
    count4: 0,
    count3: 0,
    count2: 0,
    count_passed: 0,
    count_released: 0,
    count_not_cert: 0,
    count_acad_leave: 0,
    count_expelled: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/dashboard');
        router.refresh();
      } else {
        throw new Error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Додати аналіз успішності</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="year" className="text-sm font-medium">Рік</label>
              <Input
                type="number"
                id="year"
                name="year"
                min="2000"
                max="2100"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="semester" className="text-sm font-medium">Семестр</label>
              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">Предмет</label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="id_group" className="text-sm font-medium">Група</label>
              <Input
                type="text"
                id="id_group"
                name="id_group"
                value={formData.id_group}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="id_department" className="text-sm font-medium">Кафедра</label>
              <Input
                type="text"
                id="id_department"
                name="id_department"
                value={formData.id_department}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="count_stud" className="text-sm font-medium">Кількість студентів</label>
              <Input
                type="number"
                id="count_stud"
                name="count_stud"
                min="0"
                value={formData.count_stud}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <label htmlFor="count5" className="text-sm font-medium">Оцінка "5"</label>
              <Input
                type="number"
                id="count5"
                name="count5"
                min="0"
                value={formData.count5}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="count4" className="text-sm font-medium">Оцінка "4"</label>
              <Input
                type="number"
                id="count4"
                name="count4"
                min="0"
                value={formData.count4}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="count3" className="text-sm font-medium">Оцінка "3"</label>
              <Input
                type="number"
                id="count3"
                name="count3"
                min="0"
                value={formData.count3}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="count2" className="text-sm font-medium">Оцінка "2"</label>
              <Input
                type="number"
                id="count2"
                name="count2"
                min="0"
                value={formData.count2}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="count_passed" className="text-sm font-medium">Здали</label>
              <Input
                type="number"
                id="count_passed"
                name="count_passed"
                min="0"
                value={formData.count_passed}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="count_released" className="text-sm font-medium">Звільнені</label>
              <Input
                type="number"
                id="count_released"
                name="count_released"
                min="0"
                value={formData.count_released}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="count_not_cert" className="text-sm font-medium">Не атестовані</label>
              <Input
                type="number"
                id="count_not_cert"
                name="count_not_cert"
                min="0"
                value={formData.count_not_cert}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="count_acad_leave" className="text-sm font-medium">Академвідпустка</label>
              <Input
                type="number"
                id="count_acad_leave"
                name="count_acad_leave"
                min="0"
                value={formData.count_acad_leave}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="count_expelled" className="text-sm font-medium">Відраховані</label>
              <Input
                type="number"
                id="count_expelled"
                name="count_expelled"
                min="0"
                value={formData.count_expelled}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Зберегти
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AnalysisForm;
'use client';

import PphWidget from './PphWidget';
import UpworkWidget from './UpworkWidget';

export default function FreelanceWidgets() {
  return (
    <div className="mb-12">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-6">
        Also Available On
      </h3>

      <div className="flex flex-wrap justify-center items-start gap-6">
        <PphWidget />
        <UpworkWidget />
      </div>
    </div>
  );
}

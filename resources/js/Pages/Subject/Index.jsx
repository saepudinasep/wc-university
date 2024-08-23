import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function index({ auth, subjects }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Subjects
        </h2>
      }
    >

      <Head title="Subjects" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th className="px-3 py-3">No</th>
                    <th className="px-3 py-3">Name</th>
                    <th className="px-3 py-3">Description</th>
                    <th className="px-3 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.data.map((subject, index) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={subject.id}>
                      <td className="px-3 py-2">
                        {index + 1 + (subjects.meta.current_page - 1) * subjects.meta.per_page}
                      </td>
                      <td className="px-3 py-2">{subject.name}</td>
                      <td className="px-3 py-2">{subject.description}</td>
                      <td className="px-3 py-2">
                        <Link href={route('subject.edit', subject.id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                          Edit
                        </Link>
                        <Link href={route('subject.destroy', subject.id)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination links={subjects.meta.links} />
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}

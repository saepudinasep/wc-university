import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function index({ auth, students, queryParams = null }) {

  queryParams = queryParams || {}

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value
    } else {
      delete queryParams[name]
    }

    router.get(route('student.index'), queryParams);
  }

  const onKeyPress = (name, e) => {
    if (e.key !== 'Enter') return;
    searchFieldChanged(name, e.target.value);
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Students
        </h2>
      }
    >

      <Head title="Student" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th className="px-3 py-3">No</th>
                    <th className="px-3 py-3">Photo</th>
                    <th className="px-3 py-3">Name</th>
                    <th className="px-3 py-3">Gender</th>
                    <th className="px-3 py-3">Email</th>
                    <th className="px-3 py-3">Actions</th>
                  </tr>
                  <tr>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3">
                      <TextInput
                        className="w-full"
                        placeholder="Student Name"
                        onBlur={e => searchFieldChanged('name', e.target.value)}
                        onKeyPress={e => onKeyPress('name', e)}
                      />
                    </th>
                    <th className="px-3 py-3">
                      <SelectInput
                        className="w-full"
                        defaultValue={queryParams.gender}
                        onChange={e => searchFieldChanged('gender', e.target.value)}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </SelectInput>
                    </th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {students.data.map((student, index) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={student.id}>
                      <td className="px-3 py-2">
                        {index + 1 + (students.meta.current_page - 1) * students.meta.per_page}
                      </td>
                      <td className="px-3 py-2">
                        <img src={student.photo} alt="" className="w-16" />
                      </td>
                      <td className="px-3 py-2">{student.name}</td>
                      <td className="px-3 py-2">{student.gender}</td>
                      <td className="px-3 py-2">{student.user.email}</td>
                      <td className="px-3 py-2">
                        <Link href={route('student.edit', student.id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                          Edit
                        </Link>
                        <Link href={route('student.destroy', student.id)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination links={students.meta.links} />
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}

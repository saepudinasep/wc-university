import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { GENDER_TEXT_MAP } from "../constans";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid';

export default function index({ auth, teachers, queryParams = null }) {

  queryParams = queryParams || {}

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value
    } else {
      delete queryParams[name]
    }

    router.get(route('teacher.index'), queryParams);
  }

  const onKeyPress = (name, e) => {
    if (e.key !== 'Enter') return;
    searchFieldChanged(name, e.target.value);
  }

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }

    router.get(route('teacher.index'), queryParams);
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Teachers
        </h2>
      }
    >
      <Head title="Teacher" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th className="px-3 py-3">No</th>
                    <th className="px-3 py-3">Photo</th>
                    <th onClick={e => sortChanged('name')}>
                      <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                        Name
                        <div>
                          <ChevronUpIcon className="w-4" />
                          <ChevronDownIcon className="w-4 -mt-2" />
                        </div>
                      </div>
                    </th>
                    <th className="px-3 py-3">Gender</th>
                    <th className="px-3 py-3">Email</th>
                    <th className="px-3 py-3">Actions</th>
                  </tr>
                </thead>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3">
                      <TextInput
                        className="w-full"
                        defaultValue={queryParams.name}
                        placeholder="Teacher Name"
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
                  {teachers.data.map((teacher, index) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={teacher.id}>
                      <td className="px-3 py-2">
                        {index + 1 + (teachers.meta.current_page - 1) * teachers.meta.per_page}
                      </td>
                      <td className="px-3 py-2">
                        <img src={teacher.photo} alt="" className="w-16" />
                      </td>
                      <td className="px-3 py-2">{teacher.name}</td>
                      <td className="px-3 py-2">{GENDER_TEXT_MAP[teacher.gender]}</td>
                      <td className="px-3 py-2">{teacher.user.email}</td>
                      <td className="px-3 py-2">
                        <Link href={route('teacher.edit', teacher.id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                          Edit
                        </Link>
                        <Link href={route('teacher.destroy', teacher.id)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination links={teachers.meta.links} />
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}

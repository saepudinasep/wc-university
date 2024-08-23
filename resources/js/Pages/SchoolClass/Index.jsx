import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid';

export default function index({ auth, schoolClass, queryParams = null }) {

  queryParams = queryParams || {}

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value
    } else {
      delete queryParams[name]
    }

    router.get(route('school_class.index'), queryParams);
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

    router.get(route('school_class.index'), queryParams);
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Classes
        </h2>
      }
    >
      <Head title="Classes" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th className="px-3 py-3">No</th>
                    <th onClick={e => sortChanged('class_name')}>
                      <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                        Class Name
                        <div>
                          <ChevronUpIcon className="w-4" />
                          <ChevronDownIcon className="w-4 -mt-2" />
                        </div>
                      </div>
                    </th>
                    <th onClick={e => sortChanged('academic_year')}>
                      <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                        Academic Year
                        <div>
                          <ChevronUpIcon className="w-4" />
                          <ChevronDownIcon className="w-4 -mt-2" />
                        </div>
                      </div>
                    </th>
                    <th className="px-3 py-3">Actions</th>
                  </tr>
                </thead>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3">
                      <TextInput
                        className="w-full"
                        defaultValue={queryParams.name}
                        placeholder="Class Name"
                        onBlur={e => searchFieldChanged('name', e.target.value)}
                        onKeyPress={e => onKeyPress('name', e)}
                      />
                    </th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {schoolClass.data.map((classes, index) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={classes.id}>
                      <td className="px-3 py-2">
                        {index + 1 + (schoolClass.meta.current_page - 1) * schoolClass.meta.per_page}
                      </td>
                      <td className="px-3 py-2">{classes.class_name}</td>
                      <td className="px-3 py-2">{classes.academic_year}</td>
                      <td className="px-3 py-2">
                        <Link href={route('school_class.edit', classes.id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                          Edit
                        </Link>
                        <Link href={route('school_class.destroy', classes.id)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination links={schoolClass.meta.links} />
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}

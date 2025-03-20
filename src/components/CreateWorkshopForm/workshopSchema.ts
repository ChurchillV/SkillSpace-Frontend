import * as Yup from "yup";

const workshopSchema = Yup.object().shape({
    name: Yup.string().required("Workshop name is required"),
    summary: Yup.string().required("Summary is required"),
    description: Yup.string().optional(),
    // photo: Yup.mixed().optional(),
    date: Yup.date().required("Date is required"),
    venue: Yup.string().required("Venue is required"),
    isRecurring: Yup.boolean().required(),
    isVirtual: Yup.boolean().required(),
    meetingLink: Yup.string().url("Enter a valid URL").when("isVirtual", {
        is: true,
        then: (schema) => schema.required("Meeting link is required for virtual workshops"),
        otherwise: (schema) => schema.optional(),
    }),
    chatLink: Yup.string().url("Enter a valid URL").required("Chat link is required"),
    tags: Yup.array().of(Yup.string()).optional(),
    recurrenceDetails: Yup.array().of(
        Yup.object().shape({
            date: Yup.date().required("Recurring date is required"),
            time: Yup.string().required("Recurring time is required"),
        })
    ).when("isRecurring", {
        is: true,
        then: (schema) => schema.required("Recurrence details are required for recurring workshops"),
        otherwise: (schema) => schema.optional(),
    }),
});

export default workshopSchema;
import ChooseArtist from "../components/choose_artist"
import CreateAccount from "../components/create_account"
import DescribeWorkContainer from "../components/describe_work_container"
import ThankYou from "../components/thank_you"
import UploadPhoto from "../components/upload_photo"
import UploadPhotoLanding from "../components/upload_photo_landing"

const stepsConfig = {
  chooseArtist: {
    component: ChooseArtist,
    label: "Confirm Artist/Designer",
    path: "/consign/submission/choose-artist",
    shortLabel: "Confirm",
  },
  createAccount: {
    component: CreateAccount,
    label: "Create Account",
    path: "/consign/submission/create-account",
    shortLabel: "Create",
  },
  describeWork: {
    component: DescribeWorkContainer,
    label: "Describe the Work",
    path: "/consign/submission/describe-your-work",
    shortLabel: "Describe",
    submissionPath: "/consign/submission/:id/describe-your-work",
  },
  thankYou: {
    component: ThankYou,
    submissionPath: "/consign/submission/:id/thank-you",
  },
  uploadLanding: {
    component: UploadPhotoLanding,
    submissionPath: "/consign/submission/:id/upload",
  },
  uploadPhotos: {
    component: UploadPhoto,
    label: "Upload Photos",
    shortLabel: "Upload",
    submissionPath: "/consign/submission/:id/upload-photos",
  },
}

export default stepsConfig

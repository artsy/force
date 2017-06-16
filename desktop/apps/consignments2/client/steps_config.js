import ChooseArtist from '../components/choose_artist'
import CreateAccount from '../components/create_account'
import DescribeWorkContainer from '../components/describe_work_container'
import ThankYou from '../components/thank_you'
import UploadPhoto from '../components/upload_photo'
import UploadPhotoLanding from '../components/upload_photo_landing'

const stepsConfig = {
  createAccount: {
    component: CreateAccount,
    label: 'Create Account',
    path: '/consign2/submission/create-account',
    shortLabel: 'Create'
  },
  chooseArtist: {
    component: ChooseArtist,
    label: 'Confirm Artist/Designer',
    path: '/consign2/submission/choose-artist',
    shortLabel: 'Confirm'
  },
  describeWork: {
    component: DescribeWorkContainer,
    label: 'Describe the Work',
    path: '/consign2/submission/describe-your-work',
    shortLabel: 'Describe',
    submissionPath: '/consign2/submission/:id/describe-your-work'
  },
  uploadLanding: {
    component: UploadPhotoLanding,
    submissionPath: '/consign2/submission/:id/upload'
  },
  uploadPhotos: {
    component: UploadPhoto,
    label: 'Upload Photos',
    shortLabel: 'Upload',
    submissionPath: '/consign2/submission/:id/upload-photos'
  },
  thankYou: {
    submissionPath: '/consign2/submission/:id/thank-you',
    component: ThankYou
  }
}

export default stepsConfig

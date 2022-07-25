/** GrantRoundImplementation contract ABI in Human Readable ABI Format  */

const roundImplementation = [
  "event ApplicationMetaPtrUpdated(tuple(uint256 protocol, string pointer) oldMetaPtr, tuple(uint256 protocol, string pointer) newMetaPtr)",
  "event ApplicationsEndTimeUpdated(uint256 oldTime, uint256 newTime)",
  "event ApplicationsStartTimeUpdated(uint256 oldTime, uint256 newTime)",
  "event Initialized(uint8 version)",
  "event NewProjectApplication(bytes32 indexed project, tuple(uint256 protocol, string pointer) applicationMetaPtr)",
  "event ProjectsMetaPtrUpdated(tuple(uint256 protocol, string pointer) oldMetaPtr, tuple(uint256 protocol, string pointer) newMetaPtr)",
  "event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole)",
  "event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender)",
  "event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender)",
  "event RoundEndTimeUpdated(uint256 oldTime, uint256 newTime)",
  "event RoundMetaPtrUpdated(tuple(uint256 protocol, string pointer) oldMetaPtr, tuple(uint256 protocol, string pointer) newMetaPtr)",
  "event RoundStartTimeUpdated(uint256 oldTime, uint256 newTime)",
  "function DEFAULT_ADMIN_ROLE() view returns (bytes32)",
  "function ROUND_OPERATOR_ROLE() view returns (bytes32)",
  "function applicationMetaPtr() view returns (uint256 protocol, string pointer)",
  "function applicationsEndTime() view returns (uint256)",
  "function applicationsStartTime() view returns (uint256)",
  "function applyToRound(bytes32 _projectID, tuple(uint256 protocol, string pointer) _applicationMetaPtr)",
  "function getRoleAdmin(bytes32 role) view returns (bytes32)",
  "function getRoleMember(bytes32 role, uint256 index) view returns (address)",
  "function getRoleMemberCount(bytes32 role) view returns (uint256)",
  "function grantRole(bytes32 role, address account)",
  "function hasRole(bytes32 role, address account) view returns (bool)",
  "function initialize(bytes _encodedParameters)",
  "function projectsMetaPtr() view returns (uint256 protocol, string pointer)",
  "function renounceRole(bytes32 role, address account)",
  "function revokeRole(bytes32 role, address account)",
  "function roundEndTime() view returns (uint256)",
  "function roundMetaPtr() view returns (uint256 protocol, string pointer)",
  "function roundStartTime() view returns (uint256)",
  "function supportsInterface(bytes4 interfaceId) view returns (bool)",
  "function token() view returns (address)",
  "function updateApplicationMetaPtr(tuple(uint256 protocol, string pointer) _newApplicationMetaPtr)",
  "function updateApplicationsEndTime(uint256 _newApplicationsEndTime)",
  "function updateApplicationsStartTime(uint256 _newApplicationsStartTime)",
  "function updateProjectsMetaPtr(tuple(uint256 protocol, string pointer) _newProjectsMetaPtr)",
  "function updateRoundEndTime(uint256 _newRoundEndTime)",
  "function updateRoundMetaPtr(tuple(uint256 protocol, string pointer) _newRoundMetaPtr)",
  "function updateRoundStartTime(uint256 _newRoundStartTime)",
  "function vote(bytes[] _encodedVotes)",
  "function votingStrategy() view returns (address)"
]


export default roundImplementation
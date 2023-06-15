using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Model.Entities;

namespace backend.Model.DTOs;

public class UserDTO
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    public string Name { get; set; }
    public string Password { get; set; }
    public string FamilyRole { get; set; }
    public DateTime Birthday { get; set; }
    public long FamilyId { get; set; }

}